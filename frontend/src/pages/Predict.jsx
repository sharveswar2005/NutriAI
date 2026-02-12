import React, { useState } from 'react';
import api from '../services/api';
import Layout from '../components/ui/Layout';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const Predict = () => {
    const [formData, setFormData] = useState({
        age: '',
        gender: 'male',
        height_cm: '',
        weight_kg: '',
        activity_level: 'sedentary'
    });
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await api.post('/predict/', {
                ...formData,
                age: parseInt(formData.age),
                height_cm: parseFloat(formData.height_cm),
                weight_kg: parseFloat(formData.weight_kg)
            });
            setResult(response.data);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (err) {
            alert("Prediction failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">AI Health Assessment</h1>
                    <p className="mt-3 text-lg text-slate-600 max-w-2xl mx-auto">
                        Enter your biometric details below to get a personalized caloric breakdown and nutrition plan powered by detailed analysis.
                    </p>
                </div>

                <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
                    {/* Input Form Section */}
                    <Card className="p-8 border-t-4 border-t-emerald-500 shadow-xl">
                        <div className="mb-6 pb-6 border-b border-slate-100">
                            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                                <span>📋</span> Profile Details
                            </h2>
                            <p className="text-sm text-slate-500 mt-1">All fields are required for accurate analysis</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid gap-6 sm:grid-cols-2">
                                <Input
                                    label="Age (Years)"
                                    type="number"
                                    name="age"
                                    value={formData.age}
                                    onChange={handleChange}
                                    placeholder="25"
                                    required
                                />
                                <div className="space-y-1.5">
                                    <label className="block text-sm font-semibold text-slate-700">Gender</label>
                                    <select
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleChange}
                                        className="flex h-11 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-shadow"
                                    >
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid gap-6 sm:grid-cols-2">
                                <Input
                                    label="Height (cm)"
                                    type="number"
                                    step="0.1"
                                    name="height_cm"
                                    value={formData.height_cm}
                                    onChange={handleChange}
                                    placeholder="175"
                                    required
                                />
                                <Input
                                    label="Weight (kg)"
                                    type="number"
                                    step="0.1"
                                    name="weight_kg"
                                    value={formData.weight_kg}
                                    onChange={handleChange}
                                    placeholder="70"
                                    required
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="block text-sm font-semibold text-slate-700">Activity Level</label>
                                <div className="relative">
                                    <select
                                        name="activity_level"
                                        value={formData.activity_level}
                                        onChange={handleChange}
                                        className="flex h-11 w-full appearance-none rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-shadow"
                                    >
                                        <option value="sedentary">Sedentary (Little or no exercise)</option>
                                        <option value="lightly_active">Lightly Active (Exercise 1-3 days/week)</option>
                                        <option value="moderately_active">Moderately Active (Exercise 3-5 days/week)</option>
                                        <option value="very_active">Very Active (Exercise 6-7 days/week)</option>
                                        <option value="extra_active">Extra Active (Physical job/Hard exercise)</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4">
                                <Button type="submit" className="w-full text-base py-3 shadow-emerald-200 shadow-lg" isLoading={loading}>
                                    Generate Nutrition Plan
                                </Button>
                            </div>
                        </form>
                    </Card>

                    {/* Results Section */}
                    {result && (
                        <div className="space-y-6 animate-slide-up">
                            {/* Hero Card */}
                            <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-xl p-8 text-white shadow-xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 -mt-8 -mr-8 h-32 w-32 rounded-full bg-white opacity-10 blur-xl"></div>
                                <div className="relative z-10">
                                    <h3 className="text-emerald-100 font-medium text-sm uppercase tracking-wide mb-2">Daily Caloric Target</h3>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-5xl font-bold">{result.caloric_needs.toFixed(0)}</span>
                                        <span className="text-xl text-emerald-100">kcal</span>
                                    </div>
                                    <div className="mt-6 flex flex-wrap gap-3">
                                        <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                                            <p className="text-xs text-emerald-100">BMI Score</p>
                                            <p className="font-bold text-lg">{result.bmi}</p>
                                        </div>
                                        <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                                            <p className="text-xs text-emerald-100">Category</p>
                                            <p className="font-bold text-lg">{result.bmi_category}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Plan Card */}
                            <Card className="p-0 overflow-hidden shadow-lg border-emerald-100">
                                <div className="bg-slate-50 p-4 border-b border-slate-100 flex justify-between items-center">
                                    <h3 className="font-bold text-slate-800 flex items-center gap-2">
                                        <span>🍽️</span> Suggested Meal Plan
                                    </h3>
                                    <span className="text-xs font-medium bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">{result.message.replace('Plan: ', '')}</span>
                                </div>
                                <div className="divide-y divide-slate-100">
                                    {[
                                        { label: 'Breakfast', icon: '🍳', bg: 'bg-orange-50', text: 'text-orange-600', content: result.nutrition_plan.breakfast },
                                        { label: 'Lunch', icon: '🥗', bg: 'bg-green-50', text: 'text-green-600', content: result.nutrition_plan.lunch },
                                        { label: 'Dinner', icon: '🍲', bg: 'bg-blue-50', text: 'text-blue-600', content: result.nutrition_plan.dinner },
                                        { label: 'Snack', icon: '🍎', bg: 'bg-red-50', text: 'text-red-600', content: result.nutrition_plan.snacks }
                                    ].map((meal, idx) => (
                                        <div key={idx} className="p-4 flex gap-4 hover:bg-slate-50 transition-colors">
                                            <div className={`flex-shrink-0 w-10 h-10 rounded-full ${meal.bg} flex items-center justify-center text-lg shadow-sm border border-slate-100`}>
                                                {meal.icon}
                                            </div>
                                            <div>
                                                <h4 className={`text-sm font-bold ${meal.text} mb-0.5`}>{meal.label}</h4>
                                                <p className="text-sm text-slate-600 leading-snug">{meal.content}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </div>
                    )}

                    {!result && (
                        <div className="hidden lg:flex flex-col items-center justify-center h-full p-12 text-center text-slate-400 bg-slate-100/50 rounded-xl border-2 border-dashed border-slate-200">
                            <div className="text-6xl mb-4 bg-white p-4 rounded-full shadow-sm">⚡</div>
                            <h3 className="text-lg font-semibold text-slate-600">Ready to Analyze</h3>
                            <p className="max-w-xs mx-auto mt-2">Fill out the form on the left to receive your comprehensive AI nutrition report.</p>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default Predict;
