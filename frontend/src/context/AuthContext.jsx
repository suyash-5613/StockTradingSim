import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkLoggedIn = async () => {
            let token = localStorage.getItem('auth-token');
            if (token === null) {
                localStorage.setItem('auth-token', '');
                token = '';
            }

            if (token) {
                try {
                    const res = await axios.get('/api/auth/me', {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
                    setUser(res.data);
                } catch (err) {
                    console.error('Auto-login failed', err);
                    localStorage.setItem('auth-token', '');
                }
            }
            setLoading(false);
        };
        checkLoggedIn();
    }, []);

    const login = async (email, password) => {
        const res = await axios.post('/api/auth/login', { email, password });
        localStorage.setItem('auth-token', res.data.token);
        setUser(res.data.user);
    };

    const register = async (username, email, password) => {
        const res = await axios.post('/api/auth/register', { username, email, password });
        localStorage.setItem('auth-token', res.data.token);
        setUser(res.data.user);
    };

    const logout = () => {
        localStorage.setItem('auth-token', '');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, setUser, login, register, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
