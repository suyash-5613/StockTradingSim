const User = require('../models/User');
const Portfolio = require('../models/Portfolio');
const Transaction = require('../models/Transaction');
const Stock = require('../models/Stock');

exports.buyStock = async (req, res) => {
    const { symbol, quantity } = req.body;

    try {
        const stock = await Stock.findOne({ symbol: symbol.toUpperCase() });
        if (!stock) return res.status(404).json({ message: 'Stock not found' });

        const user = await User.findById(req.user.id);
        const totalCost = stock.currentPrice * quantity;

        if (user.balance < totalCost) {
            return res.status(400).json({ message: 'Insufficient funds' });
        }

        user.balance -= totalCost;
        await user.save();

        let portfolioItem = await Portfolio.findOne({ user: req.user.id, symbol: stock.symbol });
        
        if (portfolioItem) {
            const totalPreviousCost = portfolioItem.averageBuyPrice * portfolioItem.quantity;
            const newTotalCost = totalPreviousCost + totalCost;
            portfolioItem.quantity += Number(quantity);
            portfolioItem.averageBuyPrice = newTotalCost / portfolioItem.quantity;
            await portfolioItem.save();
        } else {
            portfolioItem = new Portfolio({
                user: req.user.id,
                symbol: stock.symbol,
                quantity: Number(quantity),
                averageBuyPrice: stock.currentPrice
            });
            await portfolioItem.save();
        }

        const transaction = new Transaction({
            user: req.user.id,
            symbol: stock.symbol,
            type: 'BUY',
            quantity: Number(quantity),
            price: stock.currentPrice,
            totalAmount: totalCost
        });
        await transaction.save();

        res.json({ message: 'Buy order executed successfully', balance: user.balance, transaction });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.sellStock = async (req, res) => {
    const { symbol, quantity } = req.body;

    try {
        const stock = await Stock.findOne({ symbol: symbol.toUpperCase() });
        if (!stock) return res.status(404).json({ message: 'Stock not found' });

        const portfolioItem = await Portfolio.findOne({ user: req.user.id, symbol: stock.symbol });
        
        if (!portfolioItem || portfolioItem.quantity < quantity) {
            return res.status(400).json({ message: 'Insufficient shares to sell' });
        }

        const totalRevenue = stock.currentPrice * quantity;
        const buyCostForSharesSold = portfolioItem.averageBuyPrice * quantity;
        const profitLossOnSale = totalRevenue - buyCostForSharesSold;

        const user = await User.findById(req.user.id);
        user.balance += totalRevenue;
        await user.save();

        portfolioItem.quantity -= Number(quantity);
        if (portfolioItem.quantity === 0) {
            await Portfolio.findByIdAndDelete(portfolioItem._id);
        } else {
            await portfolioItem.save();
        }

        const transaction = new Transaction({
            user: req.user.id,
            symbol: stock.symbol,
            type: 'SELL',
            quantity: Number(quantity),
            price: stock.currentPrice,
            totalAmount: totalRevenue
        });
        await transaction.save();

        res.json({ message: 'Sell order executed successfully', balance: user.balance, profitLossOnSale, transaction });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.getTradeHistory = async (req, res) => {
    try {
        const transactions = await Transaction.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json(transactions);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
