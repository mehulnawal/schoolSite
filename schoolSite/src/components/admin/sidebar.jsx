import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard,
    Newspaper,
    Calendar,
    LogOut,
    Sun,
    Moon,
    Menu,
    X,
    ChevronRight
} from 'lucide-react';
import toast from 'react-hot-toast';

const AdminSidebar = ({ currentPage, setCurrentPage, theme, setTheme }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'news', label: 'News', icon: Newspaper },
        { id: 'events', label: 'Events', icon: Calendar }
    ];

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        window.location.href = '/admin/login';
        toast.success("Logout Successful");
    };

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    const SidebarContent = () => (
        <>
            <div className="p-6 border-b border-emerald-700/30">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
                        <LayoutDashboard className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                        <h2 className="text-white font-bold text-lg">Admin Panel</h2>
                        <p className="text-emerald-200 text-xs">Mujaddid Alsefani School</p>
                    </div>
                </div>
            </div>

            {/* Navigation Menu */}
            <nav className="flex-1 px-4 py-6 space-y-2">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentPage === item.id;

                    return (
                        <motion.button
                            key={item.id}
                            whileHover={{ x: 5 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                                setCurrentPage(item.id);
                                setIsMobileMenuOpen(false);
                            }}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ${isActive
                                ? 'bg-white text-emerald-700 shadow-lg'
                                : 'text-emerald-100 hover:bg-emerald-700/50'
                                }`}
                        >
                            <Icon className="w-5 h-5" />
                            <span className="flex-1 text-left">{item.label}</span>
                            {isActive && <ChevronRight className="w-5 h-5" />}
                        </motion.button>
                    );
                })}
            </nav>

            {/* Bottom Section - Theme Toggle & Logout */}
            <div className="p-4 border-t border-emerald-700/30 space-y-2">

                {/* Theme Toggle */}
                <button
                    onClick={toggleTheme}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-emerald-100 hover:bg-emerald-700/50 transition-all"
                >
                    {theme === 'light' ? (
                        <>
                            <Moon className="w-5 h-5" />
                            <span>Dark Mode</span>
                        </>
                    ) : (
                        <>
                            <Sun className="w-5 h-5" />
                            <span>Light Mode</span>
                        </>
                    )}
                </button>

                {/* Logout */}
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-red-300 hover:bg-red-600/20 transition-all"
                >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                </button>
            </div>
        </>
    );

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg text-white"
            >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Desktop Sidebar */}
            <aside className="hidden lg:flex lg:flex-col w-72 bg-gradient-to-b from-emerald-600 to-emerald-800 min-h-screen fixed left-0 top-0 shadow-2xl">
                <SidebarContent />
            </aside>

            {/* Mobile Sidebar */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="lg:hidden fixed inset-0 bg-black/50 z-40"
                        />

                        {/* Sidebar */}
                        <motion.aside
                            initial={{ x: -300 }}
                            animate={{ x: 0 }}
                            exit={{ x: -300 }}
                            transition={{ type: 'tween' }}
                            className="lg:hidden fixed left-0 top-0 bottom-0 w-72 bg-gradient-to-b from-emerald-600 to-emerald-800 shadow-2xl z-40 flex flex-col"
                        >
                            <SidebarContent />
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default AdminSidebar;