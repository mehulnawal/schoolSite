import React, { useState, useEffect } from 'react';
import Dashboard from './adminDashboard';
import AdminSidebar from './sidebar';
import EventsManagement from './events';
import NewsManagement from './news';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../../redux/themeSlice';

const AdminPanel = () => {
    const [currentPage, setCurrentPage] = useState('dashboard');
    const mode = useSelector((state) => state.theme.mode);
    const dispatch = useDispatch();

    useEffect(() => {
        document.documentElement.classList.toggle('dark', mode === 'dark');
    }, [mode]);

    // Check authentication on mount
    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            window.location.href = '/admin/login';
        }
    }, []);

    const renderPage = () => {
        switch (currentPage) {
            case 'dashboard':
                return <Dashboard theme={mode} />;
            case 'news':
                return <NewsManagement theme={mode} />;
            case 'events':
                return <EventsManagement theme={mode} />;
            default:
                return <Dashboard theme={mode} />;
        }
    };

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <AdminSidebar
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                theme={mode}
                setTheme={() => dispatch(toggleTheme())}
            />

            {/* Main Content */}
            <main className="flex-1 lg:ml-72">
                {renderPage()}
            </main>
        </div>
    );
};

export default AdminPanel;