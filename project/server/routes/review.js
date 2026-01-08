const express = require('express');
const router = express.Router();
const controller = require('../controllers/reviewController');
const { verifyToken } = require('../middleware/authMiddleware');

router.post('/', [verifyToken], controller.create);
router.get('/car/:carId', controller.findAllByCar);

module.exports = router;
