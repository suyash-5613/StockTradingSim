const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stockController');

router.get('/', stockController.getAllStocks);
router.get('/:symbol', stockController.getStockBySymbol);
router.post('/seed', stockController.seedStocks);

module.exports = router;
