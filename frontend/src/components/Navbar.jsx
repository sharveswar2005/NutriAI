import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from './ui/Button';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (!user) return null;

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="sticky top-0 z-50 w-full bg-white border-b border-slate-100 shadow-sm">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Brand */}
                    <Link to="/dashboard" className="flex items-center gap-2 transition-transform hover:scale-105">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100 text-2xl">
                            🥗
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                            NutriAI
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        <div className="flex items-center gap-6">
                            <Link
                                to="/dashboard"
                                className={`text-sm font-medium transition-colors duration-200 ${isActive('/dashboard')
                                    ? 'text-emerald-600'
                                    : 'text-slate-600 hover:text-emerald-600'
                                    }`}
                            >
                                Dashboard
                            </Link>
                            <Link
                                to="/predict"
                                className={`text-sm font-medium transition-colors duration-200 ${isActive('/predict')
                                    ? 'text-emerald-600'
                                    : 'text-slate-600 hover:text-emerald-600'
                                    }`}
                            >
                                New Prediction
                            </Link>
                        </div>

                        <div className="h-5 w-px bg-slate-200" aria-hidden="true" />

                        <div className="flex items-center gap-4">
                            <div className="text-right hidden lg:block">
                                <p className="text-sm font-medium text-slate-700">Account</p>
                                <p className="text-xs text-slate-500 truncate max-w-[150px]">{user?.email || 'User'}</p>
                            </div>
                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={handleLogout}
                                className="!px-3 !py-1.5 text-xs border-slate-200 hover:border-red-200 hover:text-red-600 hover:bg-red-50"
                            >
                                Logout
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
