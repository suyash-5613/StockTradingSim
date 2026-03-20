const mongoose = require('mongoose');

const PortfolioSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    symbol: {
        type: String,
        required: true,
        uppercase: true,
    },
    quantity: {
        type: Number,
        required: true,
        default: 0
    },
    averageBuyPrice: {
        type: Number,
        required: true,
        default: 0
    }
}, { timestamps: true });

// Prevent duplicate stock entries per user
PortfolioSchema.index({ user: 1, symbol: 1 }, { unique: true });

module.exports = mongoose.model('Portfolio', PortfolioSchema);
