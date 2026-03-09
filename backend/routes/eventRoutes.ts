import e, { type Router } from 'express';
import express, { type Request, type Response } from 'express';
import { GetEvents, SetEvents, UpdateEvents, DeleteEvents } from '../controllers/eventController.js';
import protect from '../middleware/authmiddleware.js';

const router: Router = express.Router();

export default router;

router.route('/').get(protect, GetEvents).post(protect, SetEvents);

router.route('/:id').put(protect, UpdateEvents).delete(protect, DeleteEvents);
