import e, { type Router } from 'express';
import express, { type Request, type Response } from 'express';
import { GetSpells, SetSpells, UpdateSpells, DeleteSpells, GetPrivspell, SetPrivSpell, GetAllSpells } from '../controllers/spellController.js';
import protect from '../middleware/authmiddleware.js';
import {GetSpellList, SetSpellList, UpdateSpellList} from '../controllers/spellsavecontroller.js';

const router: Router = express.Router();

export default router;

router.route('/').post(SetSpells).get(protect, GetAllSpells);
router.route('/privatespell').post(protect, SetPrivSpell);
router.route('/privatespell/:identify').get(protect, GetPrivspell);
router.route('/spelllist').get(protect, GetSpellList).post(protect, SetSpellList).put(protect, UpdateSpellList);
router.route('/:identify').put(UpdateSpells).delete(DeleteSpells).get(GetSpells).get(protect, GetPrivspell);



/*
router.route('/').get(protect, GetSpells).post(protect, SetSpells);

router.route('/:id').put(protect, UpdateSpells).delete(protect, DeleteSpells);
*/
