import mongoose from "mongoose";

const spellsaveSchema = new mongoose.Schema({
    user:{type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    spells: {
        type: [String],
        required: [true, 'Please add a text value'], 
        index: true,
    },
    customdescription: {
        type: [String],
        required: [true, 'Please add a text value'], 
        index: true,
    },
}, {
    timestamps: true
})


export default mongoose.model('SpellUpdate', spellsaveSchema);