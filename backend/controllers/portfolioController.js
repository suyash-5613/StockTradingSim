const Portfolio = require('../models/Portfolio');
const Stock = require('../models/Stock');
const User = require('../models/User');

exports.getPortfolio = async (req, res) => {
    try {
        const portfolio = await Portfolio.find({ user: req.user.id });
        const user = await User.findById(req.user.id);
        
        let totalValue = 0;
        let totalProfitLoss = 0;
        
        const enrichedPortfolio = await Promise.all(portfolio.map(async (item) => {
            const stock = await Stock.findOne({ symbol: item.symbol });
            const currentPrice = stock ? stock.currentPrice : item.averageBuyPrice;
            
            const currentValue = currentPrice * item.quantity;
            const investedValue = item.averageBuyPrice * item.quantity;
            const profitLoss = currentValue - investedValue;
            const profitLossPercent = investedValue > 0 ? (profitLoss / investedValue) * 100 : 0;
            
            totalValue += currentValue;
            totalProfitLoss += profitLoss;

            return {
                ...item._doc,
                currentPrice,
                currentValue,
                profitLoss,
                profitLossPercent
            };
        }));

        res.json({
            balance: user.balance,
            totalPortfolioValue: totalValue,
            totalProfitLoss,
            holdings: enrichedPortfolio
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
