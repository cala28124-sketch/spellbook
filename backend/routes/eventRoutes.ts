import e, { type Router } from 'express';
import express, { type Request, type Response } from 'express';
import { GetSpells, SetSpells, UpdateSpells, DeleteSpells, GetPrivspell, SetPrivSpell } from '../controllers/spellController.js';
import protect from '../middleware/authmiddleware.js';

const router: Router = express.Router();

export default router;

router.route('/').post(SetSpells);
router.route('/privatespell').post(protect, SetPrivSpell);
router.route('/privatespell/:identify').get(protect, GetPrivspell);
router.route('/:identify').put(UpdateSpells).delete(DeleteSpells).get(GetSpells).get(protect, GetPrivspell);




/*
router.route('/').get(protect, GetSpells).post(protect, SetSpells);

router.route('/:id').put(protect, UpdateSpells).delete(protect, DeleteSpells);
*/
