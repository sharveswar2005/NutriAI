import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/ui/Layout';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await login(email, password);
            navigate('/dashboard');
        } catch (err) {
            console.error("Login error:", err);
            if (err.response && err.response.data && err.response.data.detail) {
                setError(err.response.data.detail);
            } else {
                setError(err.message || 'Login failed due to network error.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout showNavbar={false}>
            <div className="flex min-h-[90vh] flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-emerald-50 via-white to-slate-50 fixed inset-0 z-0">
                <div className="w-full max-w-md space-y-8 relative z-10">
                    <div className="text-center">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-4xl mb-4 shadow-sm">
                            🥗
                        </div>
                        <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                            Welcome back
                        </h2>
                        <p className="mt-2 text-sm text-slate-600">
                            Sign in to your NutriAI account
                        </p>
                    </div>

                    <Card className="p-8 shadow-xl border-t-4 border-t-emerald-500">
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            {error && (
                                <div className="rounded-md bg-red-50 p-4 border border-red-100">
                                    <div className="flex">
                                        <div className="flex-shrink-0 text-red-400">⚠️</div>
                                        <div className="ml-3">
                                            <h3 className="text-sm font-medium text-red-800">Login Failed</h3>
                                            <div className="mt-1 text-sm text-red-700">{error}</div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <Input
                                id="email"
                                name="email"
                                type="email"
                                label="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@example.com"
                                required
                            />

                            <div className="space-y-1">
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    label="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                />
                                <div className="text-right">
                                    <a href="#" className="text-xs font-medium text-emerald-600 hover:text-emerald-500">
                                        Forgot password?
                                    </a>
                                </div>
                            </div>

                            <Button type="submit" className="w-full" isLoading={loading}>
                                Sign in
                            </Button>
                        </form>

                        <div className="mt-6 text-center text-sm">
                            <span className="text-slate-500">Don't have an account? </span>
                            <Link to="/register" className="font-semibold text-emerald-600 hover:text-emerald-500">
                                Create free account
                            </Link>
                        </div>
                    </Card>

                    <p className="text-center text-xs text-slate-400">
                        &copy; 2026 NutriAI Inc. All rights reserved.
                    </p>
                </div>
            </div>
        </Layout>
    );
};

export default Login;
