const express = require('express');
const router=express.Router();
const wrkSpaceController=require('./../controllers/wrkspaceController');

router.route('/').post(wrkSpaceController.createWrkSpace);
router.route('/card/').post(wrkSpaceController.createCard);
// router.route('/card/').patch(wrkSpaceController.addCards);
router.route('/list/').post(wrkSpaceController.createTask);

module.exports = router;