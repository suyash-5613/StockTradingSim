import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <Link to="/" className="nav-brand text-gradient">TradeSimPro</Link>
            <div className="nav-links">
                {user ? (
                    <>
                        <span className="text-muted">Balance: <strong className="text-success">${user.balance?.toLocaleString(undefined, {minimumFractionDigits: 2})}</strong></span>
                        <Link to="/dashboard" className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}>Dashboard</Link>
                        <Link to="/portfolio" className={`nav-link ${location.pathname === '/portfolio' ? 'active' : ''}`}>Portfolio</Link>
                        <button onClick={handleLogout} className="btn" style={{padding: '0.4rem 1rem', background: 'transparent', border: '1px solid var(--danger)', color: 'var(--danger)'}}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="nav-link">Login</Link>
                        <Link to="/register" className="btn btn-primary" style={{padding: '0.5rem 1rem'}}>Sign Up</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
