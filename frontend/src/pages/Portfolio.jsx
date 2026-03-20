import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Portfolio = () => {
    const [portfolioData, setPortfolioData] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchPortfolio = async () => {
        try {
            const token = localStorage.getItem('auth-token');
            const res = await axios.get('/api/portfolio', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setPortfolioData(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPortfolio();
    }, []);

    if (loading) return <div style={{ textAlign: 'center', marginTop: '5rem' }}>Analyzing Portfolio...</div>;
    if (!portfolioData) return <div style={{ textAlign: 'center' }}>Failed to load portfolio</div>;

    const { balance, totalPortfolioValue, totalProfitLoss, holdings } = portfolioData;

    return (
        <div>
            {/* Top Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
                <div className="glass-panel text-center">
                    <p className="text-muted">Total Portfolio Value</p>
                    <h2 className="text-gradient" style={{ fontSize: '2.5rem', margin: '0.5rem 0' }}>
                        ${(balance + totalPortfolioValue).toLocaleString(undefined, {minimumFractionDigits: 2})}
                    </h2>
                </div>
                <div className="glass-panel text-center">
                    <p className="text-muted">Available Cash</p>
                    <h2 style={{ fontSize: '2rem', margin: '0.5rem 0' }}>
                        ${balance.toLocaleString(undefined, {minimumFractionDigits: 2})}
                    </h2>
                </div>
                <div className="glass-panel text-center">
                    <p className="text-muted">Total Returns (P/L)</p>
                    <h2 className={totalProfitLoss >= 0 ? 'text-success' : 'text-danger'} style={{ fontSize: '2rem', margin: '0.5rem 0' }}>
                        {totalProfitLoss >= 0 ? '+' : ''}${totalProfitLoss.toLocaleString(undefined, {minimumFractionDigits: 2})}
                    </h2>
                </div>
            </div>

            {/* Holdings Table */}
            <div className="glass-panel">
                <h3 style={{ marginBottom: '1.5rem' }}>Current Holdings</h3>
                {holdings.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                        <p>No stocks in your portfolio yet.</p>
                        <Link to="/dashboard" className="btn btn-primary" style={{ marginTop: '1rem' }}>Go to Market</Link>
                    </div>
                ) : (
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid var(--glass-border)', color: 'var(--text-muted)' }}>
                                    <th style={{ padding: '1rem' }}>Asset</th>
                                    <th style={{ padding: '1rem' }}>Shares</th>
                                    <th style={{ padding: '1rem' }}>Avg Cost</th>
                                    <th style={{ padding: '1rem' }}>Current Price</th>
                                    <th style={{ padding: '1rem', textAlign: 'right' }}>Total Value</th>
                                    <th style={{ padding: '1rem', textAlign: 'right' }}>Total Return</th>
                                </tr>
                            </thead>
                            <tbody>
                                {holdings.map((item, idx) => (
                                    <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                        <td style={{ padding: '1rem' }}><strong>{item.symbol}</strong></td>
                                        <td style={{ padding: '1rem' }}>{item.quantity}</td>
                                        <td style={{ padding: '1rem' }}>${item.averageBuyPrice.toFixed(2)}</td>
                                        <td style={{ padding: '1rem' }}>${item.currentPrice.toFixed(2)}</td>
                                        <td style={{ padding: '1rem', textAlign: 'right' }}>${item.currentValue.toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
                                        <td style={{ padding: '1rem', textAlign: 'right' }} className={item.profitLoss >= 0 ? 'text-success' : 'text-danger'}>
                                            {item.profitLoss >= 0 ? '+' : ''}${item.profitLoss.toFixed(2)} ({item.profitLossPercent.toFixed(2)}%)
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Portfolio;
