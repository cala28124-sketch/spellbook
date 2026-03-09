import jsonwebtoken from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import expressAsyncHandler from 'express-async-handler';
import userModel from '../model/usermodel.js';
import { type Request, type Response, type RequestHandler } from 'express';

declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}



// @desc Register new user
// @route POST /api/users
// @access Public
const registerUser: RequestHandler = expressAsyncHandler (async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    if(!name || !email || !password) {
        res.status(400);
        throw new Error('Please add all fields');
    }
    // Check if user exists
    const userExists = await userModel.findOne({email});
    if(userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await userModel.create({
        name,
        email,
        password: hashedPassword
    })

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id.toString())
    })
} else {
    res.status(400);
    throw new Error('Invalid user data');
}

})



// @desc Authenticate a user
// @route POST /api/users/login
// @access Public
const loginUser: RequestHandler = expressAsyncHandler (async (req: Request, res: Response) => {
    const { email, password } = req.body;

    // Check for user email
    const user = await userModel.findOne({email});

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id.toString())
        })
    }

    else{
         res.status(400);
        throw new Error('Invalid credentials data');
    }

})




// @desc get user data
// @route GET /api/users/me
// @access Private
const getMe: RequestHandler = expressAsyncHandler(async (req: Request, res: Response) => {
    // since we have the protect middleware, we can just send back the user data that is attached to the request object in the protect middleware.
    // If you used the 'protect' middleware correctly, the user is already on the req
    const {id, name, email} = req.user;
    res.status(200).json({
        id,
        name,
        email
    })
})

// generate a token or JWT for authentication, we can use this token to protect routes and ensure that only authenticated users can access certain resources.
const generateToken = (id: string) => {
    return jsonwebtoken.sign({ id }, process.env.JWT_SECRET as string, {
        expiresIn: '30d',
    })
}



export { registerUser, loginUser, getMe };