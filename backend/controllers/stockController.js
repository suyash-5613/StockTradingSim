const Stock = require('../models/Stock');

exports.getAllStocks = async (req, res) => {
    try {
        const stocks = await Stock.find();
        res.json(stocks);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.getStockBySymbol = async (req, res) => {
    try {
        const stock = await Stock.findOne({ symbol: req.params.symbol.toUpperCase() });
        if (!stock) return res.status(404).json({ message: 'Stock not found' });
        res.json(stock);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.seedStocks = async (req, res) => {
    const initialStocks = [
        { symbol: 'AAPL', name: 'Apple Inc.', currentPrice: 175.50 },
        { symbol: 'GOOGL', name: 'Alphabet Inc.', currentPrice: 135.20 },
        { symbol: 'TSLA', name: 'Tesla Inc.', currentPrice: 240.10 },
        { symbol: 'AMZN', name: 'Amazon', currentPrice: 145.80 },
        { symbol: 'MSFT', name: 'Microsoft', currentPrice: 330.40 }
    ];

    try {
        await Stock.deleteMany();
        const inserted = await Stock.insertMany(initialStocks);
        res.json({ message: 'Stocks seeded successfully', data: inserted });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
