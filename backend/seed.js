const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Stock = require('./models/Stock');

mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        const initialStocks = [
            { symbol: 'AAPL', name: 'Apple Inc.', currentPrice: 175.50 },
            { symbol: 'GOOGL', name: 'Alphabet Inc.', currentPrice: 135.20 },
            { symbol: 'TSLA', name: 'Tesla Inc.', currentPrice: 240.10 },
            { symbol: 'AMZN', name: 'Amazon', currentPrice: 145.80 },
            { symbol: 'MSFT', name: 'Microsoft', currentPrice: 330.40 }
        ];
        await Stock.deleteMany();
        await Stock.insertMany(initialStocks);
        console.log('Seeded successfully!');
        process.exit();
    });
