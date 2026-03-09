
import express, { type Request, type Response, type Router } from 'express';
const router: Router = express.Router();
import { registerUser, getMe, loginUser } from '../controllers/userController.js';
import protect from '../middleware/authmiddleware.js';

router.post('/', registerUser);
router.post('/login', loginUser);
// protect acts as a barrier that only allows the route to go through to getMe once next is called
router.get('/me', protect, getMe);


export default router;

