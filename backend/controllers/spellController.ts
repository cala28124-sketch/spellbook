import { type Request, type Response, type RequestHandler } from 'express';
import expressAsyncHandler from 'express-async-handler';
import SpellModel from '../model/spellModel.js';
import usermodel from '../model/usermodel.js';
import spellModel from '../model/spellModel.js';

// @desc Get spell
// @route GET /api/
// @access public
const GetSpells: RequestHandler = expressAsyncHandler(async (req: Request, res: Response) => {
    //const Spell = await SpellModel.find({ user: req.user?.id });
    //const Spell = await SpellModel.find({})
    //const spell = await SpellModel.findById(req.params.id);
    const name = req.params.identify as string;
    const spell = await SpellModel.findOne({name: name});

    if(!spell){
        res.status(404);
        throw new Error("Spell Not Found");
    }

    res.status(200).json(spell);
})

// @desc Set goals
// @route POST /api/events
// @access Private
const SetSpells: RequestHandler = expressAsyncHandler(async (req: Request, res: Response) => {

    const { name, Components, SchoolSpell, Description } = req.body;


    if(!req.body?.name) { 
        res.status(400)
        throw new Error('Please add a spell name');
    }else if(!req.body?.Components) { 
        res.status(400)
        throw new Error('Please add atleast one component, or none');
    } else if(!req.body?.SchoolSpell) { 
        res.status(400)
        throw new Error('Please add a school name');
    }else if(!req.body?.Description) { 
        res.status(400)
        throw new Error('Please add a description');
    }

    const Spell = await SpellModel.create({
        name: req.body.name,
        Components:req.body.Components,
        SchoolSpell:req.body.SchoolSpell,
        Description:req.body.Description,
        //user: req.user?.id,
    })
    
    res.status(200).json(Spell);
})

// @desc Get private spells
// @route GET /api/privatespell
// @access Private
const GetPrivspell = expressAsyncHandler(async (req: Request, res: Response) => {
    const userID = req.user?.id;
    const name = req.params.identify as string;
    //can do this later if want to find all public/private spells, but for now just do private
    /*
    const spells = await spellModel.find({ $or: [
            { isPublic: true },        // Show all public spells
            { user: userID }           // Show spells belonging to this specific user
        ] });
         */

    const spells = await spellModel.findOne({ user: userID, name: name });

    if (!spells) {
        res.status(404);
        throw new Error('Spell not found');
    }

     res.status(200).json(spells);
})

// @desc Set private spells
// @route POST /api/privatespell
// @access Private
const SetPrivSpell = expressAsyncHandler(async (req: Request, res: Response) => {
    if(!req.body?.name) { 
        res.status(400)
        throw new Error('Please add a spell name');
    }else if(!req.body?.Components) { 
        res.status(400)
        throw new Error('Please add atleast one component, or none');
    } else if(!req.body?.SchoolSpell) { 
        res.status(400)
        throw new Error('Please add a school name');
    }else if(!req.body?.Description) { 
        res.status(400)
        throw new Error('Please add a description');
    }

    const Event = await spellModel.create({
        name: req.body.name,
        Components:req.body.Components,
        SchoolSpell:req.body.SchoolSpell,
        Description:req.body.Description,
        user: req.user?.id,
    })
    
    res.status(200).json(Event);
})

// @desc Update goals
// @route PUT /api/events/:id
// @access Private
const UpdateSpells: RequestHandler = expressAsyncHandler(async (req: Request, res: Response) => {

    const Spell = await SpellModel.findById(req.params.identify);

    if(!Spell) {
        res.status(400)
        throw new Error('Spell not found');
    }

    // first checks for user
    /*
    const user = await usermodel.findById(req.user?.id);

    //check for user
    if(!user) {
        res.status(401)
        throw new Error('User not found');
    }
        


    // checks if logged in user matches the goal ID of the user it belongs to
    
    if(Spell.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized');
    }
        */

    const updatedSpell = await SpellModel.findByIdAndUpdate(req.params.identify, req.body, {new: true})


     res.status(200).json(updatedSpell);
})

// @desc Delete goals
// @route DELETE /api/events/:id
// @access Private
const DeleteSpells: RequestHandler = expressAsyncHandler(async (req: Request, res: Response) => {
    const Spell = await SpellModel.findById(req.params.identify);

    if(!Spell) {
        res.status(400)
        throw new Error('Goal not found');
    }

    // first checks for user
    /*
    const user = await usermodel.findById(req.user?.id);

    //check for user
    if(!user) {
        res.status(401)
        throw new Error('User not found');
    }


    // checks if logged in user matches the goal ID of the user it belongs to
    
    if(Spell.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized');
    }
        */

    await Spell.deleteOne();

    res.status(200).json({id: req.params.identify});
})



export { GetSpells, SetSpells, UpdateSpells, DeleteSpells, GetPrivspell, SetPrivSpell };