import schoolLogoWhite from '../assets/logo/schoolLogoWhite.png'
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
    Menu, X, ChevronRight, BookOpen, Users, Award,
    Calendar, Star, Phone, Mail, MapPin, ArrowRight,
    GraduationCap, Heart, Shield, Sparkles
} from 'lucide-react';

export const Footer = () => {
    return (
        <>
            <section className="py-24 relative overflow-hidden" style={{ background: `linear-gradient(135deg, #059669 0%, #064e3b 100%)` }}>
                {/* Decorative Pattern Overlay */}
                <div className="absolute inset-0 opacity-10"
                    style={{ backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`, backgroundSize: '30px 30px' }}>
                </div>

                {/* Moving Light Effect */}
                <motion.div
                    animate={{
                        opacity: [0.3, 0.5, 0.3],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute -top-24 -right-24 w-96 h-96 rounded-full blur-3xl"
                    style={{ background: '#fbbf24' }} // Subtle Amber glow to tie in the accent color
                />

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Ready to Join Our Community?
                        </h2>
                        <p className="text-xl text-emerald-50 mb-10 opacity-90 leading-relaxed">
                            Give your child the gift of excellent Islamic education integrated with CBSE & GSEB standards. <br className="hidden md:block" /> Admissions are now open!
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                            <motion.a href="/admission"
                                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-white text-emerald-800 px-10 py-4 rounded-full font-bold text-lg shadow-2xl hover:bg-emerald-50 transition-all flex items-center">
                                Start Application <ArrowRight className="ml-2" size={20} />
                            </motion.a>

                            {/* <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="border-2 border-white/40 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-all backdrop-blur-sm"
                            >
                                Inquire Now
                            </motion.button> */}
                        </div>
                    </motion.div>
                </div >
            </section >

            <div className="bg-slate-900 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-4">
                    <div className="grid md:grid-cols-4 gap-12 mb-12">
                        {/* About */}
                        <div className="md:col-span-2">
                            <div className="flex items-center space-x-3 mb-6">
                                <img src={schoolLogoWhite} className="w-12 mr-3"
                                    alt="School Logo" />
                                <div>
                                    <h3 className="text-xl font-bold">Mujaddid Alsefani School</h3>
                                </div>
                            </div>
                            <p className="text-slate-400 mb-6 leading-relaxed">
                                Providing exceptional Islamic education combined with academic excellence for over 15 years. Nurturing faith, building futures.
                            </p>
                            <div className="flex space-x-4">
                                {[
                                    { icon: FaFacebookF, label: "Facebook", hover: "group-hover:text-[#1877F2]" },
                                    { icon: FaInstagram, label: "Instagram", hover: "group-hover:text-[#E4405F]" },
                                    { icon: FaTwitter, label: "Twitter", hover: "group-hover:text-[#1DA1F2]" },
                                    { icon: FaYoutube, label: "YouTube", hover: "group-hover:text-[#FF0000]" },
                                ].map((social, index) => {
                                    const Icon = social.icon;
                                    return (
                                        <motion.a
                                            key={index}
                                            href="#"
                                            whileHover={{ scale: 1.15, y: -3 }}
                                            whileTap={{ scale: 0.9 }}
                                            className="group w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-white"
                                            aria-label={social.label}
                                        >
                                            <Icon className={`text-white text-lg transition-colors duration-300 ${social.hover}`} />
                                        </motion.a>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h4 className="text-lg font-bold mb-6 text-emerald-400">Quick Links</h4>
                            <ul className="space-y-3">
                                <motion.li whileHover={{ x: 5 }}>
                                    <a href="/" className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center">
                                        <ChevronRight size={16} className="mr-1" />
                                        Home
                                    </a>
                                </motion.li>
                                <motion.li whileHover={{ x: 5 }}>
                                    <a href="/about/trustee" className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center">
                                        <ChevronRight size={16} className="mr-1" />
                                        Trust Board
                                    </a>
                                </motion.li>
                                <motion.li whileHover={{ x: 5 }}>
                                    <a href="/about/principal" className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center">
                                        <ChevronRight size={16} className="mr-1" />
                                        Principal's Desk
                                    </a>
                                </motion.li>
                                <motion.li whileHover={{ x: 5 }}>
                                    <a href="/academics/syllabus" className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center">
                                        <ChevronRight size={16} className="mr-1" />
                                        Syllabus
                                    </a>
                                </motion.li>
                                <motion.li whileHover={{ x: 5 }}>
                                    <a href="/academics/teachingStaff" className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center">
                                        <ChevronRight size={16} className="mr-1" />
                                        Teaching Staff
                                    </a>
                                </motion.li>
                                <motion.li whileHover={{ x: 5 }}>
                                    <a href="/mpd" className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center">
                                        <ChevronRight size={16} className="mr-1" />
                                        MPD
                                    </a>
                                </motion.li>
                                <motion.li whileHover={{ x: 5 }}>
                                    <a href="/news-events" className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center">
                                        <ChevronRight size={16} className="mr-1" />
                                        News & Events
                                    </a>
                                </motion.li>
                                <motion.li whileHover={{ x: 5 }}>
                                    <a href="/admission" className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center">
                                        <ChevronRight size={16} className="mr-1" />
                                        Admission
                                    </a>
                                </motion.li>
                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div>
                            <h4 className="text-lg font-bold mb-6 text-emerald-400">Contact Us</h4>
                            <ul className="space-y-4">
                                <li className="flex items-start">
                                    <MapPin className="w-5 h-5 text-emerald-500 mr-3 mt-1 flex-shrink-0" />
                                    <span className="text-slate-400">
                                        T.P. 23 PLOT No. 69, Rander, Gorat Road, Adajan Patiya, Surat. 395009
                                    </span>
                                </li>
                                <li className="flex items-center">
                                    <Phone className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0" />
                                    <a href="tel:+917359026258" className="text-slate-400 hover:text-emerald-400 transition-colors">
                                        +91 73590-26258
                                    </a>
                                </li>
                                <li className="flex items-center">
                                    <Mail className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0" />
                                    <a href="mailto:alfesanischool@yahoo.in" className="text-slate-400 hover:text-emerald-400 transition-colors">
                                        alfesanischool@yahoo.in
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-slate-800 pt-8">
                        <div className="flex flex-col md:flex-row justify-between items-center">
                            <p className="text-slate-500 text-sm mb-4 md:mb-0">
                                © 2025 Mujaddid Alsefani School. All rights reserved.
                            </p>
                            <div className="flex space-x-6">
                                <a href="#" className="text-slate-500 hover:text-emerald-400 text-sm transition-colors">Privacy Policy</a>
                                <a href="#" className="text-slate-500 hover:text-emerald-400 text-sm transition-colors">Terms of Service</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}