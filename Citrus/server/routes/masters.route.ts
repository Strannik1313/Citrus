import express from 'express';
import MastersController from '@controllers/masters.controller';
import MastersControllerValidator from '../validators/masters.controller.validator';

const router = express.Router();

router.get('/masters', MastersControllerValidator.validateMasters, MastersController.masters);
router.get('/masters/:id', MastersControllerValidator.validateMasterById, MastersController.masterById);
router.patch('/master', MastersControllerValidator.validateUpdateMaster, MastersController.updateMaster);
router.post('/master', MastersControllerValidator.validateCreateMaster, MastersController.createMaster);
router.delete('/master', MastersControllerValidator.validateDeleteMaster, MastersController.deleteMaster);

export { router as MastersRoutes };
