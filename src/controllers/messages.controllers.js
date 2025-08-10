import { getReceverSocketId, io } from '../libs/socket.js';
import MessagesData from '../models/messages.models.js'
import User from '../models/user.model.js'

export const getUsersFromSidebar = async (req, res) => {

    try {
        const loggedInuserId = req.user._id;

        const filteredusers = await User.find({_id: {$ne: loggedInuserId}}).select("-password")

        res.status(200).json(filteredusers);
    } catch (error) {
        console.log('error in getUsersForSidebar', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


export const getMessages = async (req, res) => {

    try {
        const { id: userToChatId } = req.params;

        const myId = req.user._id;

        const messages = await MessagesData.find({
            $or: [
                {senderId: myId, receiverId: userToChatId},
                {senderId: userToChatId, receiverId: myId},
            ]
        });

        res.status(200).json(messages);

    } catch (error) {
        console.log('error in getMessages', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


export const sendMessages = async (req, res) => {
    try {
        const { text } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        const newMessages = new MessagesData({
            senderId,
            receiverId,
            text,
        });

        await newMessages.save();

        const receiverSocketId = getReceverSocketId(receiverId);

        if(receiverSocketId) {
            io.to(receiverId).emit("newMessages", newMessages);

        }
        res.status(201).json(newMessages);

    } catch (error) {
        console.log('error in getMessages', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

