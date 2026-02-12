import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import Layout from '../components/ui/Layout';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await api.post('/auth/register', { email, password });
            navigate('/login');
        } catch (err) {
            setError('Registration failed. Email might be already securely registered.');
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
                            🚀
                        </div>
                        <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                            Start your journey
                        </h2>
                        <p className="mt-2 text-sm text-slate-600">
                            Join NutriAI for personalized health insights
                        </p>
                    </div>

                    <Card className="p-8 shadow-xl border-t-4 border-t-emerald-500">
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            {error && (
                                <div className="rounded-md bg-red-50 p-4 border border-red-100">
                                    <div className="text-sm text-red-700">{error}</div>
                                </div>
                            )}

                            <Input
                                id="email"
                                type="email"
                                label="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@example.com"
                                required
                            />

                            <Input
                                id="password"
                                type="password"
                                label="Create Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Min 8 characters"
                                required
                            />

                            <Button type="submit" className="w-full" isLoading={loading}>
                                Create Account
                            </Button>
                        </form>

                        <div className="mt-6 text-center text-sm">
                            <span className="text-slate-500">Already a member? </span>
                            <Link to="/login" className="font-semibold text-emerald-600 hover:text-emerald-500">
                                Sign in
                            </Link>
                        </div>
                    </Card>
                </div>
            </div>
        </Layout>
    );
};

export default Register;
