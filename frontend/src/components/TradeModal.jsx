import React, { useState } from 'react';
import axios from 'axios';

const TradeModal = ({ isOpen, onClose, stock, onSuccess }) => {
    const [action, setAction] = useState('BUY');
    const [quantity, setQuantity] = useState(1);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    if (!isOpen || !stock) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const token = localStorage.getItem('auth-token');
            const url = action === 'BUY' ? '/api/trade/buy' : '/api/trade/sell';
            await axios.post(url, { symbol: stock.symbol, quantity }, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            onSuccess();
            onClose();
        } catch (err) {
            setError(err.response?.data?.message || 'Transaction failed');
        } finally {
            setLoading(false);
        }
    };

    const total = (stock.currentPrice * quantity).toLocaleString(undefined, {minimumFractionDigits: 2});

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)',
            display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
        }}>
            <div className="glass-panel" style={{ width: '100%', maxWidth: '400px', background: 'rgba(30, 41, 59, 0.95)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h3 className="text-gradient">Trade {stock.symbol}</h3>
                    <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-main)', fontSize: '1.5rem', cursor: 'pointer' }}>&times;</button>
                </div>

                {error && <div className="text-danger" style={{ marginBottom: '1rem' }}>{error}</div>}

                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                    <button className="btn" style={{ flex: 1, background: action === 'BUY' ? 'var(--success)' : 'transparent', border: '1px solid var(--success)', color: action === 'BUY' ? 'white' : 'var(--success)' }} onClick={() => setAction('BUY')}>BUY</button>
                    <button className="btn" style={{ flex: 1, background: action === 'SELL' ? 'var(--danger)' : 'transparent', border: '1px solid var(--danger)', color: action === 'SELL' ? 'white' : 'var(--danger)' }} onClick={() => setAction('SELL')}>SELL</button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Current Price</label>
                        <div className="form-control" style={{ background: 'rgba(0,0,0,0.2)' }}>${stock.currentPrice.toFixed(2)}</div>
                    </div>
                    <div className="form-group">
                        <label>Quantity</label>
                        <input type="number" min="1" required className="form-control"
                            value={quantity} onChange={e => setQuantity(Number(e.target.value))} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 0', borderTop: '1px solid var(--glass-border)', marginTop: '1rem' }}>
                        <span>Estimated Total:</span>
                        <strong className="text-gradient">${total}</strong>
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }} disabled={loading}>
                        {loading ? 'Processing...' : `Confirm ${action}`}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default TradeModal;
