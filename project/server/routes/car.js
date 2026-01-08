const express = require('express');
const router = express.Router();
const controller = require('../controllers/carController');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

router.get('/', controller.findAll);
router.get('/:id', controller.findOne);
router.post('/', [verifyToken, isAdmin], controller.create);
router.put('/:id', [verifyToken, isAdmin], controller.update);
router.delete('/:id', [verifyToken, isAdmin], controller.delete);

module.exports = router;
