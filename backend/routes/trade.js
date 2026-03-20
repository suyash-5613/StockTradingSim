const express = require('express');
const router = express.Router();
const tradeController = require('../controllers/tradeController');
const auth = require('../middleware/authMiddleware');

router.post('/buy', auth, tradeController.buyStock);
router.post('/sell', auth, tradeController.sellStock);
router.get('/history', auth, tradeController.getTradeHistory);

module.exports = router;
