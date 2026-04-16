import { type Request, type Response, type RequestHandler } from 'express';
import expressAsyncHandler from 'express-async-handler';
import SpellSaveModel from '../model/SpellSaveModel.js';
import usermodel from '../model/usermodel.js';
import { error } from 'node:console';

// @desc Get spell
// @route GET /api/
// @access public
const GetSpellList: RequestHandler = expressAsyncHandler(async (req: Request, res: Response) => {
    const userID = req.user?.id;
    const spell = await SpellSaveModel.findOne({ user: userID});

    if(!spell){
        res.status(200).json(null);
        return;
    }

    res.status(200).json(spell);
    console.log("spell got");
})

// @desc Set goals
// @route POST /api/events
// @access Private
const SetSpellList: RequestHandler = expressAsyncHandler(async (req: Request, res: Response) => {

    if(!req.body?.spells) { 
        res.status(400)
        throw new Error('Please add spells');
    }else if(!req.body?.customdescription) { 
        res.status(400)
        throw new Error('Please add a custom description');
    }

    const Spell = await SpellSaveModel.create({
        user: req.user.id,
        spells: req.body.spells,
        customdescription: req.body.customdescription,
    })
    
    res.status(200).json(Spell);
    console.log("spell sent");
})

// @desc Update goals
// @route PUT /api/events/:id
// @access Private
const UpdateSpellList: RequestHandler = expressAsyncHandler(async (req: Request, res: Response) => {

    // first checks for user
    const user = await usermodel.findById(req.user?.id);

    //check for user
    if(!user) {
        res.status(401)
        throw new Error('User not found');
    }
        

    const updatedSpell = await SpellSaveModel.findOneAndUpdate({user: req.user?.id}, req.body, {new: true});

    if(!updatedSpell){
        res.status(404);
        throw new Error('Spell list not found');
    }


     res.status(200).json(updatedSpell);
})


export { GetSpellList, SetSpellList, UpdateSpellList };