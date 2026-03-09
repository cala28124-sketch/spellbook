import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({

    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please add a password']
    },
    name: {
        type: String,
        required: [true, 'Please add a name']
    }
}, {
    timestamps: true
})


// cam always add more fields to the schema as needed, such as profile picture, bio, etc.

export default mongoose.model('User', usersSchema);