import e, { type Router } from 'express';
import express, { type Request, type Response } from 'express';
import { GetSpells, SetSpells, UpdateSpells, DeleteSpells } from '../controllers/spellController.js';
import protect from '../middleware/authmiddleware.js';

const router: Router = express.Router();

export default router;

router.route('/').post(SetSpells);

router.route('/:id').get(GetSpells).put(UpdateSpells).delete(DeleteSpells);

/*
router.route('/').get(protect, GetSpells).post(protect, SetSpells);

router.route('/:id').put(protect, UpdateSpells).delete(protect, DeleteSpells);
*/
