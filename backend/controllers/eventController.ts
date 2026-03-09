import { type Request, type Response, type RequestHandler } from 'express';
import expressAsyncHandler from 'express-async-handler';
import eventModel from '../model/eventModel.js';
import usermodel from '../model/usermodel.js';

// @desc Get goals
// @route GET /api/events
// @access Private
const GetEvents: RequestHandler = expressAsyncHandler(async (req: Request, res: Response) => {
    const Event = await eventModel.find({ user: req.user?.id });

    res.status(200).json(Event);
})

// @desc Set goals
// @route POST /api/events
// @access Private
const SetEvents: RequestHandler = expressAsyncHandler(async (req: Request, res: Response) => {
    if(!req.body?.text) { 
        res.status(400)
        throw new Error('Please add a text field');
    }

    const Event = await eventModel.create({
        text: req.body.text,
        user: req.user?.id,
    })
    
    res.status(200).json(Event);
})

// @desc Update goals
// @route PUT /api/events/:id
// @access Private
const UpdateEvents: RequestHandler = expressAsyncHandler(async (req: Request, res: Response) => {

    const Event = await eventModel.findById(req.params.id);

    if(!Event) {
        res.status(400)
        throw new Error('Event not found');
    }

    // first checks for user
    const user = await usermodel.findById(req.user?.id);

    //check for user
    if(!user) {
        res.status(401)
        throw new Error('User not found');
    }


    // checks if logged in user matches the goal ID of the user it belongs to
    if(Event.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized');
    }

    const updatedEvent = await eventModel.findByIdAndUpdate(req.params.id, req.body, {new: true})


     res.status(200).json(updatedEvent);
})

// @desc Delete goals
// @route DELETE /api/events/:id
// @access Private
const DeleteEvents: RequestHandler = expressAsyncHandler(async (req: Request, res: Response) => {
    const Event = await eventModel.findById(req.params.id);

    if(!Event) {
        res.status(400)
        throw new Error('Goal not found');
    }

    // first checks for user
    const user = await usermodel.findById(req.user?.id);

    //check for user
    if(!user) {
        res.status(401)
        throw new Error('User not found');
    }


    // checks if logged in user matches the goal ID of the user it belongs to
    if(Event.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized');
    }

    await Event.deleteOne();

    res.status(200).json({id: req.params.id});
})



export { GetEvents, SetEvents, UpdateEvents, DeleteEvents };