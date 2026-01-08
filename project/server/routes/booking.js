const express = require('express');
const router = express.Router();
const controller = require('../controllers/bookingController');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

router.post('/', [verifyToken], controller.create);
router.get('/', [verifyToken], controller.findAllUserBookings);
router.get('/all', [verifyToken, isAdmin], controller.findAll);

module.exports = router;
