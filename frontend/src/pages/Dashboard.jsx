import React, { useEffect, useState } from 'react';
import api from '../services/api';
import Layout from '../components/ui/Layout';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await api.get('/history/');
                setHistory(response.data);
            } catch (error) {
                console.error("Failed to fetch history", error);
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, []);

    return (
        <Layout>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Your Health Dashboard</h1>
                    <p className="mt-1 text-slate-600">Track your past assessments and progress.</p>
                </div>
                <Link to="/predict">
                    <Button className="shadow-emerald-200 shadow-md">
                        <span className="mr-2 text-lg">+</span> New Assessment
                    </Button>
                </Link>
            </div>

            {loading ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="h-64 rounded-xl bg-slate-200 animate-pulse flex items-center justify-center text-slate-400">
                            Loading data...
                        </div>
                    ))}
                </div>
            ) : history.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-16 bg-white rounded-xl border border-slate-200 border-dashed text-center">
                    <div className="bg-emerald-50 text-emerald-500 w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-4">
                        📊
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900">No History Yet</h3>
                    <p className="text-slate-500 mt-2 mb-8 max-w-sm">
                        You haven't generated any nutrition plans yet. Start by taking your first assessment.
                    </p>
                    <Link to="/predict">
                        <Button variant="primary" size="lg">Start First Assessment</Button>
                    </Link>
                </div>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {history.map((record, index) => (
                        <Card key={index} className="flex flex-col h-full hover:shadow-lg transition-all duration-300 hover:border-emerald-200 group">
                            <div className="p-6 flex-grow">
                                <div className="flex justify-between items-start mb-4">
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider bg-slate-100 px-2 py-1 rounded">
                                        {new Date(record.timestamp).toLocaleDateString()}
                                    </span>
                                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold
                                        ${!record.bmi_category ? 'bg-slate-100 text-slate-800' :
                                            record.bmi_category === 'Normal Weight' ? 'bg-emerald-100 text-emerald-800' :
                                                ['Overweight', 'Obese'].some(s => record.bmi_category.includes(s)) ? 'bg-orange-100 text-orange-800' :
                                                    'bg-red-100 text-red-800'}`}>
                                        {record.bmi_category || 'Unknown'}
                                    </span>
                                </div>

                                <div className="mb-6">
                                    <div className="text-4xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                                        {record.caloric_needs.toFixed(0)}
                                    </div>
                                    <div className="text-sm font-medium text-slate-500">Daily Calories (kcal)</div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                                    <div>
                                        <p className="text-xs text-slate-400 mb-0.5">Weight</p>
                                        <p className="font-semibold text-slate-700">{record.weight_kg} kg</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-400 mb-0.5">BMI</p>
                                        <p className="font-semibold text-slate-700">{record.bmi}</p>
                                    </div>
                                    <div className="col-span-2">
                                        <p className="text-xs text-slate-400 mb-0.5">Activity Level</p>
                                        <p className="font-semibold text-slate-700 capitalize text-sm">
                                            {record.activity_level.replace('_', ' ')}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </Layout>
    );
};

export default Dashboard;
