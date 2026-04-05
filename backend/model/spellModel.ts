import mongoose from "mongoose";

const spellSchema = new mongoose.Schema({
    user:{type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    
    name: {
        type: String,
        required: [true, 'Please add a text value'], 
        index: [true],
    },
    Components: {
        type: [String],
        required: [true, 'Please add a text value']
    },
    SchoolSpell: {
        type: String,
        required: [true, 'Please add a text value']
    },
    Description: {
        type: String,
        required: [true, 'Please add a text value']
    }
}, {
    timestamps: true
})


export default mongoose.model('Spell', spellSchema);


/*
 name: "Mana Bolt",
      Components: ["Verbal", "Somatic"],
      ManaCost: "Minimal",
      SchoolSpell: "Evocation",
      description: "A white bolt of Magical Energy",
      */
