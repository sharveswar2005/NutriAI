import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // In a real app, you'd verify the token with an endpoint like /auth/me
            // For now, we'll decode it or just assume it's valid if present for UI state
            // But better to fetch user details if possible.
            // Since we don't have /auth/me, we'll just set a dummy user state or 
            // rely on the token presence. 
            // Let's implement a simple check or just set user to {}.
            setUser({ token });
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        const formData = new FormData();
        formData.append('username', email); // OAuth2 expects 'username'
        formData.append('password', password);

        const response = await api.post('/auth/login', formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        localStorage.setItem('token', response.data.access_token);
        setUser({ token: response.data.access_token });
    };

    const register = async (email, password) => {
        await api.post('/auth/register', { email, password });
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
