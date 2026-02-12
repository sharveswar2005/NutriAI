import React from 'react';
import Navbar from '../Navbar';

const Layout = ({ children, showNavbar = true }) => {
    return (
        <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900">
            {showNavbar && <Navbar />}
            <main className="flex-grow container mx-auto px-4 py-8 sm:px-6 lg:px-8">
                {children}
            </main>
            <footer className="border-t border-slate-200 bg-white py-6">
                <div className="container mx-auto px-4 text-center text-sm text-slate-500">
                    &copy; {new Date().getFullYear()} NutriAI. All rights reserved.
                </div>
            </footer>
        </div>
    );
};

export default Layout;
