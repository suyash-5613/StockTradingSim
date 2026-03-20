import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import TradeModal from '../components/TradeModal';

// Generate simulated intraday chart data based on current price
const generateChartData = (currentPrice) => {
    let price = currentPrice * 0.95; // Start 5% lower
    const data = [];
    for (let i = 0; i < 20; i++) {
        price = price + (Math.random() - 0.45) * 5; // random walk
        data.push({ time: `${9 + Math.floor(i/2)}:${i%2===0?'00':'30'}`, price: Number(price.toFixed(2)) });
    }
    data.push({ time: 'Now', price: currentPrice });
    return data;
};

const Dashboard = () => {
    const [stocks, setStocks] = useState([]);
    const [selectedStock, setSelectedStock] = useState(null);
    const [isTradeModalOpen, setIsTradeModalOpen] = useState(false);
    const { setUser } = useContext(AuthContext);

    const fetchStocks = async () => {
        try {
            const res = await axios.get('/api/stocks');
            setStocks(res.data);
            if (res.data.length > 0 && !selectedStock) {
                setSelectedStock(res.data[0]);
            }
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchStocks();
    }, []);

    const openTradeModal = (stock) => {
        setSelectedStock(stock);
        setIsTradeModalOpen(true);
    };

    const handleTradeSuccess = async () => {
        // Refresh balance in context
        try {
            const token = localStorage.getItem('auth-token');
            const res = await axios.get('/api/auth/me', { headers: { 'Authorization': `Bearer ${token}` } });
            setUser(res.data);
            alert('Trade successful!');
        } catch (err) {
            console.error(err);
        }
    };

    if (stocks.length === 0) return <div style={{ textAlign: 'center', marginTop: '5rem' }}>Loading market data...</div>;

    const chartData = generateChartData(selectedStock?.currentPrice || 100);

    return (
        <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '2rem' }}>
                {/* Market List */}
                <div className="glass-panel" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
                    <h3 className="text-muted" style={{ marginBottom: '1rem' }}>Market Overview</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                        {stocks.map(stock => (
                            <div key={stock._id} 
                                 onClick={() => setSelectedStock(stock)}
                                 style={{ 
                                    padding: '1rem', borderRadius: '12px', cursor: 'pointer',
                                    background: selectedStock?._id === stock._id ? 'rgba(59, 130, 246, 0.2)' : 'rgba(0,0,0,0.2)',
                                    border: `1px solid ${selectedStock?._id === stock._id ? 'var(--accent-primary)' : 'transparent'}`,
                                    transition: 'all 0.2s',
                                    display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                                 }}>
                                <div>
                                    <strong style={{ display: 'block' }}>{stock.symbol}</strong>
                                    <span className="text-muted" style={{ fontSize: '0.85rem' }}>{stock.name}</span>
                                </div>
                                <strong>${stock.currentPrice.toFixed(2)}</strong>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Main Detailed View */}
                {selectedStock && (
                    <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
                            <div>
                                <h1 style={{ fontSize: '2.5rem' }}>{selectedStock.symbol}</h1>
                                <p className="text-muted" style={{ fontSize: '1.2rem' }}>{selectedStock.name}</p>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <h1 className="text-gradient">${selectedStock.currentPrice.toFixed(2)}</h1>
                                <button className="btn btn-primary" style={{ marginTop: '1rem' }} onClick={() => openTradeModal(selectedStock)}>
                                    Trade {selectedStock.symbol}
                                </button>
                            </div>
                        </div>

                        {/* Chart Area */}
                        <div style={{ flex: 1, minHeight: '400px', background: 'rgba(0,0,0,0.2)', borderRadius: '16px', padding: '1rem' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={chartData}>
                                    <XAxis dataKey="time" stroke="var(--text-muted)" />
                                    <YAxis domain={['auto', 'auto']} stroke="var(--text-muted)" />
                                    <Tooltip 
                                        contentStyle={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: '8px' }}
                                        itemStyle={{ color: 'var(--text-main)' }} />
                                    <Line type="monotone" dataKey="price" stroke="var(--accent-primary)" strokeWidth={3} dot={false} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                )}
            </div>

            <TradeModal isOpen={isTradeModalOpen} onClose={() => setIsTradeModalOpen(false)} stock={selectedStock} onSuccess={handleTradeSuccess} />
        </div>
    );
};

export default Dashboard;
