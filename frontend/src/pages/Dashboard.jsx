import React, { useEffect, useState } from 'react';
import api from '../services/api';
import Layout from '../components/ui/Layout';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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
                <div className="space-y-8 animate-slide-up">
                    {/* Growth Tracking Charts */}
                    {history.length > 0 && (
                        <div className="grid gap-6 lg:grid-cols-2">
                            <Card className="p-6 border-t-4 border-t-emerald-500 shadow-sm">
                                <h3 className="font-bold text-slate-800 mb-4 bg-slate-50 p-2 rounded flex items-center gap-2">
                                    <span>📈</span> Weight Trend (kg)
                                </h3>
                                <div className="h-64 w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={[...history].reverse().map(r => ({ date: new Date(r.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }), weight: r.weight_kg }))} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                            <defs>
                                                <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                                                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                            <XAxis dataKey="date" tick={{fontSize: 12}} tickLine={false} axisLine={false} />
                                            <YAxis tick={{fontSize: 12}} tickLine={false} axisLine={false} domain={['dataMin - 5', 'dataMax + 5']} />
                                            <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
                                            <Area type="monotone" dataKey="weight" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorWeight)" />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </Card>
                            <Card className="p-6 border-t-4 border-t-blue-500 shadow-sm">
                                <h3 className="font-bold text-slate-800 mb-4 bg-slate-50 p-2 rounded flex items-center gap-2">
                                    <span>📊</span> BMI Trend
                                </h3>
                                <div className="h-64 w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={[...history].reverse().map(r => ({ date: new Date(r.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }), bmi: r.bmi }))} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                            <defs>
                                                <linearGradient id="colorBmi" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                            <XAxis dataKey="date" tick={{fontSize: 12}} tickLine={false} axisLine={false} />
                                            <YAxis tick={{fontSize: 12}} tickLine={false} axisLine={false} domain={['dataMin - 2', 'dataMax + 2']} />
                                            <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
                                            <Area type="monotone" dataKey="bmi" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorBmi)" />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </Card>
                        </div>
                    )}

                    <div>
                        <h2 className="text-xl font-bold text-slate-800 mb-6 border-b border-slate-100 pb-2">Recent Assessments</h2>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {history.map((record, index) => (
                                <Card key={index} className="flex flex-col h-full hover:shadow-lg transition-all duration-300 hover:border-emerald-200 group">
                                    <div className="p-6 flex-grow">
                                        <div className="flex justify-between items-start mb-4">
                                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider bg-slate-100 px-2 py-1 rounded border border-slate-200">
                                                {new Date(record.timestamp).toLocaleDateString()}
                                            </span>
                                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold shadow-sm
                                                ${!record.health_status ? 'bg-slate-100 text-slate-800' :
                                                    record.health_status === 'Normal Weight' || record.health_status === 'Normal' ? 'bg-emerald-100 text-emerald-800' :
                                                        ['Overweight', 'Obese'].some(s => record.health_status.includes(s)) ? 'bg-orange-100 text-orange-800' :
                                                            'bg-red-100 text-red-800'}`}>
                                                {record.health_status || record.bmi_category || 'Unknown'}
                                            </span>
                                        </div>

                                        <div className="mb-4">
                                            <div className="flex items-baseline gap-2">
                                                <div className="text-4xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                                                    {record.caloric_needs.toFixed(0)}
                                                </div>
                                                <div className="text-sm font-medium text-slate-500">kcal</div>
                                            </div>
                                            <div className="text-xs text-slate-400 mt-1 uppercase tracking-wide">Daily Target</div>
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
                                            {record.nutrition_score !== undefined && record.nutrition_score !== null && (
                                                <div className="col-span-2 mt-2 bg-emerald-50 rounded p-2 flex justify-between items-center border border-emerald-100">
                                                    <span className="text-xs font-semibold text-emerald-800">Nutrition Score</span>
                                                    <span className="text-sm font-bold text-emerald-600">{record.nutrition_score}/100</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default Dashboard;
