import User from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import { tokenGenerator } from "../libs/utils.js";

export const signUp = async (req, res) => {

    const { wa_id,  fullName, email, password, phoneNumber } = req.body;

    try {
        if (!fullName || !email || !password || !phoneNumber) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: 'password must be more than 6 characters' });
        }

         if (phoneNumber.length < 10) {
            return res.status(400).json({ message: 'please fill 10 digit number' });
        }

        const user = await User.findOne({ email });

        if (user) return res.status(400).json({ message: 'user already exists' });

        const salt = await bcrypt.genSalt(10)

        const hashedPassword = await bcrypt.hash(password, salt);



        const newUser = new User({
            wa_id: crypto.randomUUID(),
            email,
            fullName,
            password: hashedPassword,
            phoneNumber
        });

        if (newUser) {

            const token = tokenGenerator(newUser._id, res);

            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                phoneNumber: newUser.phoneNumber,
                token: token
            })
            console.log("sucess")
        }
        else {
            res.status(400).json({ message: 'invalid user data' })
        }


    } catch (error) {
        console.log("Error in signup controller:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const login = async (req, res) => {
    // Logic for user signup
    
    const { email, password} = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User does not exist' });
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        
        

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        tokenGenerator(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
        });
    } catch (error) {
        console.log("Error in login controller:", error);
        res.status(500).json({ message: 'Invalid creditionals' });
    }
}
export const logout = (req, res) => {
    // Logic for user signup
    try {
        res.cookie("jwt", "", {maxAge: 0})
        res.status(200).json({ message: 'User logged out successfully' });
    } catch (error) {
        console.log("Error in logout controller:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const checkAuth = async (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("Error in checkAuth controller:", error);
        res.status(500).json({ message: "internal server Error" })
    }
}