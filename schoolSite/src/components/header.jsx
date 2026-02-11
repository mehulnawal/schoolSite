import { Outlet, Link } from "react-router-dom";
import { Footer } from "./footer";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Phone, Mail } from "lucide-react";

// logo
import schoolLogoBlack from "../assets/logo/schoolLogoBlack.jpeg";


export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const navLinks = [
        {
            name: "Home",
            path: "/"
        },
        {
            name: "About",
            dropdown: [
                { name: "Trust Board", path: "/about/trustee" },
                { name: "Principal's Desk", path: "/about/principal" },
            ],
        },
        {
            name: "Academics",
            dropdown: [
                { name: "Syllabus", path: "/academics/syllabus" },
                { name: "Teaching Staff", path: "/academics/teachingStaff" },
            ],
        },
        {
            name: "MPD",
            path: "/mpd"
        },
        {
            name: "News&Events",
            path: "/news-events"
        },
        {
            name: "Admission",
            path: "/admission"
        },
        {
            name: "Contact",
            dropdown: [
                {
                    name: "Call Us",
                    path: "tel:+919876543210", // Replace with actual phone number
                    icon: Phone,
                    external: true
                },
                {
                    name: "Email Us",
                    path: "mailto:info@alfesanischool.edu", // Replace with actual email
                    icon: Mail,
                    external: true
                },
            ],
        },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className="fixed w-full z-40 bg-white/95 backdrop-blur-md shadow-lg transition-all duration-300"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        {/* Logo */}
                        <motion.div whileHover={{ scale: 1.05 }}>
                            <Link to="/" className="flex items-center space-x-3">
                                <img
                                    src={schoolLogoBlack}
                                    className="w-12"
                                    alt="School Logo"
                                />
                                <h1 className="text-md lg:text-xl font-bold text-slate-800">
                                    Mujaddid Alsefani School
                                </h1>
                            </Link>
                        </motion.div>

                        {/* Desktop Menu */}
                        <div className="hidden lg:flex items-center space-x-6">
                            {navLinks.map((item) =>
                                item.dropdown ? (
                                    <div key={item.name} className="relative group">
                                        <div className="flex items-center gap-1 cursor-pointer font-medium text-slate-700 hover:text-emerald-600 transition-colors">
                                            {item.name}
                                            <ChevronDown size={16} className="group-hover:rotate-180 transition-transform duration-300" />
                                        </div>

                                        {/* Dropdown */}
                                        <div className="absolute right-0 mt-3 w-52 bg-white shadow-xl rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border border-gray-100">

                                            {
                                                item.dropdown.map((sub) => (
                                                    sub.external ? (
                                                        <a
                                                            key={sub.name}
                                                            href={sub.path}
                                                            className="flex items-center gap-2 px-4 py-3 text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors first:rounded-t-xl last:rounded-b-xl"
                                                        >
                                                            {sub.icon && <sub.icon size={18} />}
                                                            {sub.name}
                                                        </a>
                                                    ) : (
                                                        <Link
                                                            key={sub.name}
                                                            to={sub.path}
                                                            className="block px-4 py-3 text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors first:rounded-t-xl last:rounded-b-xl"
                                                        >
                                                            {sub.name}
                                                        </Link>
                                                    )
                                                ))}
                                        </div>
                                    </div>
                                ) : (
                                    <Link
                                        key={item.name}
                                        to={item.path}
                                        className="font-medium text-slate-700 hover:text-emerald-600 transition-colors whitespace-nowrap"
                                    >
                                        {item.name}
                                    </Link>
                                )
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="lg:hidden text-slate-700 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="lg:hidden bg-white border-t border-gray-200"
                        >
                            <div className="px-4 py-6 space-y-2 shadow-lg max-h-[calc(100vh-80px)] overflow-y-auto">
                                {navLinks.map((item) =>
                                    item.dropdown ? (
                                        <div key={item.name} className="border-b border-gray-100 pb-4 last:border-0">
                                            <p className="font-semibold text-slate-800 py-2 text-lg">
                                                {item.name}
                                            </p>
                                            <div className="pl-4 space-y-2">
                                                {item.dropdown.map((sub) => (
                                                    sub.external ? (
                                                        <a
                                                            key={sub.name}
                                                            href={sub.path}
                                                            onClick={() => setIsMenuOpen(false)}
                                                            className="flex items-center gap-2 text-slate-600 hover:text-emerald-600 py-2 transition-colors"
                                                        >
                                                            {sub.icon && <sub.icon size={18} />}
                                                            {sub.name}
                                                        </a>
                                                    )
                                                        : (
                                                            <Link
                                                                key={sub.name}
                                                                to={sub.path}
                                                                onClick={() => setIsMenuOpen(false)}
                                                                className="block text-slate-600 hover:text-emerald-600 py-2 transition-colors"
                                                            >
                                                                {sub.name}
                                                            </Link>
                                                        )
                                                ))}
                                            </div>
                                        </div>
                                    ) : (
                                        <Link
                                            key={item.name}
                                            to={item.path}
                                            onClick={() => setIsMenuOpen(false)}
                                            className="block text-slate-700 hover:text-emerald-600 font-semibold py-2 text-lg border-b border-gray-100 pb-4 transition-colors last:border-0"
                                        >
                                            {item.name}
                                        </Link>
                                    )
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence >
            </motion.nav >

            <Outlet />
            <Footer />
        </>
    );
};