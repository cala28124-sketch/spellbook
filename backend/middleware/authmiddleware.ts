import jsonwebtoken from 'jsonwebtoken';
import expressAsyncHandler from 'express-async-handler';
import userModel from '../model/usermodel.js';
import { type Request, type Response, type NextFunction, type RequestHandler  } from 'express';

// this is needed due to typescript not initially recognizing user on the request object, so we need to declare it here.
declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

const protect: RequestHandler= expressAsyncHandler (async (req: Request, res: Response, next: NextFunction) => {
    let token;
    token = req.cookies.token;

    if(token) {
        try{
            const decoded = jsonwebtoken.verify(token, process.env.JWT_SECREt as string) as jsonwebtoken.JwtPayload;
            req.user = await userModel.findById(decoded.id).select('-password');
            next();
            // next just makes it continue and call the next middleware
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    }

    if(!token) {
        res.status(401);
        throw new Error('Not authorized, no token');
    }

});

/* 
old protect no cookies
const protect: RequestHandler= expressAsyncHandler (async (req: Request, res: Response, next: NextFunction) => {
    let token;
    


    // checks if authorization header exists and if it starts with Bearer, which is the standard for sending tokens in the header.
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // first thing you want to do is get token from Bearer header. Split is used to split it from the bearer token, and split by space, because its (bearer token), token being the second item or the 1 index.
            token = req.headers.authorization.split(' ')[1]?.toString() || '';
            // you want to verify the token with jwt
            const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET as string) as jsonwebtoken.JwtPayload;
            
            // get the user from the token, - password makes it so doesnt have password

            req.user = await userModel.findById(decoded.id).select('-password');
            next();
            // next just makes it continue and call the next middleware

        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    }

    if(!token) {
        res.status(401);
        throw new Error('Not authorized, no token');
    }

});
*/


export default protect;

//middleware functions are what are ran when the request is sent but before being fully done. So we can use this to check if the user is authenticated before allowing them to access certain routes.