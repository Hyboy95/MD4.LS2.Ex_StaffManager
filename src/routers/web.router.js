const express = require('express');
const StaffController = require('../controllers/staff.controller');
const router = express.Router();

router.get('/', StaffController.getDisplayPage);
router.post('/', StaffController.getDisplayPage);
router.get('/create', StaffController.getCreateStaff);
router.post('/create', StaffController.addStaff);
router.get('/delete', StaffController.deleteStaff);
router.get('/update', StaffController.getUpdatePage);
router.post('/update', StaffController.updateStaff);

module.exports = router;
