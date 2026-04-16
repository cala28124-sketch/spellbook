import { type Request, type Response, type RequestHandler } from 'express';
import expressAsyncHandler from 'express-async-handler';
import SpellSaveModel from '../model/SpellSaveModel.js';
import usermodel from '../model/usermodel.js';

// @desc Get spell
// @route GET /api/
// @access public
const GetSpells: RequestHandler = expressAsyncHandler(async (req: Request, res: Response) => {
    //const Spell = await SpellModel.find({ user: req.user?.id });
    //const Spell = await SpellModel.find({})
    //const spell = await SpellModel.findById(req.params.id);
    const name = req.params.identify as string;
    const spell = await SpellSaveModel.findOne({name: name, user: {$exists: false}});

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

    const Spell = await SpellSaveModel.create({
        
        //user: req.user?.id,
    })
    
    res.status(200).json(Spell);
})

// @desc Update goals
// @route PUT /api/events/:id
// @access Private
const UpdateSpells: RequestHandler = expressAsyncHandler(async (req: Request, res: Response) => {

    const Spell = await SpellSaveModel.findById(req.params.identify);

    if(!Spell) {
        res.status(400)
        throw new Error('Spell not found');
    }

    const updatedSpell = await SpellSaveModel.findByIdAndUpdate(req.params.identify, req.body, {new: true})


     res.status(200).json(updatedSpell);
})


export { GetSpells, SetSpells, UpdateSpells };