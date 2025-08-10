import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
    wa_id: {
        type: String,
        required: false,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    phoneNumber: {
        type: String,
        required: true,
        minlength: 10
    }
    
    
},
{
    timestamps: true,
}
);

const User = mongoose.model("User", userSchema);

export default User;
