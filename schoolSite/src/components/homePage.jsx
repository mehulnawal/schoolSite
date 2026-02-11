import React, { useState, useEffect } from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { motion, useScroll, AnimatePresence } from 'framer-motion';
import {
    Menu, X, ChevronRight, BookOpen, Users, Award,
    Calendar, Star, Phone, Mail, MapPin, ArrowRight,
    GraduationCap, Heart, Shield, Sparkles
} from 'lucide-react';

// banner image
import schoolBannerImg from '../assets/banner/school-banner-img.jfif'

// about image
import aboutImg1 from '../assets/about_us/aboutUs_img1.jfif'
import aboutImg2 from '../assets/about_us/aboutUs_img2.jfif'
import aboutImg3 from '../assets/about_us/aboutUs_img3.jpeg'
import aboutImg4 from '../assets/about_us/aboutUs_img4.jfif'

import { getDatabase, ref, onValue } from "firebase/database";
import { app } from "../components/firebase";

const HomePage = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { scrollYProgress } = useScroll();

    const [dynamicBanner, setDynamicBanner] = useState(null);
    const [admissionOpen, setAdmissionOpen] = useState(false);

    const [loadingBanner, setLoadingBanner] = useState(true);
    const [upcomingNews, setUpcomingNews] = useState([]);
    const [upcomingEvents, setUpcomingEvents] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    useEffect(() => {
        const db = getDatabase(app);
        const dashboardRef = ref(db, "dashboard");

        const unsubscribe = onValue(dashboardRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();

                setDynamicBanner(data.bannerImageUrl || null);
                setAdmissionOpen(data.admissionOpen ?? false);
            }
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const db = getDatabase(app);

        // Real-time listener for News
        const newsRef = ref(db, 'news/newsList');
        const unsubscribeNews = onValue(newsRef, (snapshot) => {
            if (snapshot.exists()) {
                const allNews = Object.values(snapshot.val());
                const today = new Date().toISOString().split('T')[0];

                // Filter upcoming/current news, sort by date, take first 3
                const upcoming = allNews
                    .filter(n => n.date >= today)
                    .sort((a, b) => new Date(a.date) - new Date(b.date))
                    .slice(0, 3);

                setUpcomingNews(upcoming);
            } else {
                setUpcomingNews([]);
            }
        });

        // Real-time listener for Events
        const eventsRef = ref(db, 'events/eventsList');
        const unsubscribeEvents = onValue(eventsRef, (snapshot) => {
            if (snapshot.exists()) {
                const allEvents = Object.values(snapshot.val());
                const today = new Date().toISOString().split('T')[0];

                // Filter upcoming events, sort by date, take first 3
                const upcoming = allEvents
                    .filter(e => e.date >= today)
                    .sort((a, b) => new Date(a.date) - new Date(b.date))
                    .slice(0, 3);

                setUpcomingEvents(upcoming);
            } else {
                setUpcomingEvents([]);
            }
        });

        // Cleanup
        return () => {
            unsubscribeNews();
            unsubscribeEvents();
        };
    }, []);

    // Animation variants
    const fadeInUp = {
        hidden: { opacity: 0, y: 60 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const programs = [
        {
            title: "Alfesani Juniors",
            description: "A playful environment for our youngest learners, where curiosity meets the first steps with quality education.",
            icon: Heart,
            color: "from-emerald-500 to-teal-500"
        },
        {
            title: "M.A. School",
            description: "Building strong academic foundation with comprehensive Islamic education",
            icon: BookOpen,
            color: "from-blue-500 to-cyan-500"
        },
    ];

    const features = [
        {

            icon: Award,

            title: "Deeni & Dunyawi Education",

            description: "Islamic Values & Modern Education"

        },

        {

            icon: Shield,

            title: "Safe Environment",

            description: "A nurturing campus facilitating daily prayers and character development."

        },

        {

            icon: Users,

            title: "Holistic Development",

            description: "Personalized attention ensuring excellence in both studies and morals."

        },

        // {
        //     icon: Heart,

        //     title: "Character Building",

        //     description: "Focus on Sunnah, ethics, and producing responsible citizens of tomorrow."
        // },

        {

            icon: Sparkles,

            title: "Modern Facilities",

            description: "STEM labs, library, and art rooms matching international educational standards."

        }

    ];

    const aboutUsImage = [
        {
            id: 1,
            image: aboutImg1
        },

        {
            id: 2,
            image: aboutImg2
        },

        {
            id: 3,
            image: aboutImg3
        },

        {
            id: 4,
            image: aboutImg4
        },
    ]

    const stats = [
        { number: "15+", label: "Years of Excellence" },
        { number: "500+", label: "Happy Students" },
        { number: "1:12", label: "Teacher Ratio" },
        { number: "98%", label: "Parent Satisfaction" }
    ];



    // useEffect(() => {
    //     if (isMenuOpen) {
    //         document.body.style.overflow = 'hidden';
    //     } else {
    //         document.body.style.overflow = 'unset';
    //     }
    //     // Cleanup on unmount
    //     return () => { document.body.style.overflow = 'unset'; };
    // }, [isMenuOpen]);

    return (
        <div className="bg-slate-50 overflow-hidden">

            {/* Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-amber-500 z-50 origin-left shadow-lg"
                style={{ scaleX: scrollYProgress }}
            />

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center overflow-hidden">
                <div className="absolute inset-0 w-full h-full">
                    <img
                        src={dynamicBanner || schoolBannerImg}
                        alt="Mujaddid Alsefani School"
                        className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/60"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40"></div>
                </div>

                {/* mx-auto */}
                <div className="max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 pt-20">

                    <div className="grid grid-cols-1 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-center md:text-left max-w-3xl mx-auto md:mx-0"
                        >
                            {admissionOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="inline-block bg-white/20 backdrop-blur-md text-white border border-white/30 px-4 py-2 rounded-full text-sm font-medium mb-6"
                                >
                                    ✨ Admissions Open for 2026-27
                                </motion.div>
                            )}

                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 drop-shadow-2xl">
                                <span className="text-white">Fostering</span>
                                <br />
                                <span className="bg-gradient-to-r from-emerald-400 via-amber-400 to-emerald-300 bg-clip-text text-transparent">
                                    Future Leaders
                                </span>
                            </h1>

                            <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 leading-relaxed drop-shadow-lg max-w-2xl">
                                The newest approach in Theology, with the deepest roots
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                                <motion.button
                                    whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(255, 255, 255, 0.3)" }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-white text-emerald-700 px-8 py-4 rounded-full font-semibold text-lg shadow-2xl flex items-center justify-center group hover:bg-emerald-50 transition-colors"
                                >
                                    Schedule a Visit
                                    <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
                                </motion.button>

                                {/* <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-colors backdrop-blur-sm"
                                >
                                    Learn More
                                </motion.button> */}
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Floating Elements */}
                {/* <motion.div
                    animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute top-32 right-4 md:right-12 lg:right-20 bg-white/90 backdrop-blur-sm p-3 md:p-4 rounded-xl shadow-2xl z-20"
                >
                    <Star className="w-6 h-6 md:w-8 md:h-8 text-amber-500" />
                </motion.div> */}

                {/* <motion.div
                    animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                    className="absolute bottom-32 md:bottom-40 left-4 md:left-12 lg:left-20 bg-white/90 backdrop-blur-sm p-3 md:p-4 rounded-xl shadow-2xl z-20"
                >
                    <Award className="w-6 h-6 md:w-8 md:h-8 text-emerald-600" />
                </motion.div>

                <motion.div
                    animate={{ x: [0, 10, 0], y: [0, -10, 0] }}
                    transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                    className="absolute top-40 left-4 md:left-16 bg-white/90 backdrop-blur-sm p-3 md:p-4 rounded-xl shadow-2xl z-20 hidden sm:block"
                >
                    <BookOpen className="w-6 h-6 md:w-8 md:h-8 text-emerald-600" />
                </motion.div>

                <motion.div
                    animate={{ x: [0, -10, 0], y: [0, 10, 0] }}
                    transition={{ duration: 5, repeat: Infinity, delay: 1.5 }}
                    className="absolute bottom-40 right-4 md:right-16 bg-white/90 backdrop-blur-sm p-3 md:p-4 rounded-xl shadow-2xl z-20 hidden sm:block"
                >
                    <GraduationCap className="w-6 h-6 md:w-8 md:h-8 text-amber-600" />
                </motion.div> */}
            </section>

            {/* About Us Section */}
            <section className="py-15 pt-12 bg-white" id="about">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerContainer}
                        className="grid md:grid-cols-2 gap-16 items-center"
                    >
                        <motion.div variants={fadeInUp}>
                            <h2 className="text-4xl text-center md:text-start md:text-5xl font-bold mb-6" style={{ color: "black" }}>
                                About Us
                            </h2>
                            <div className="space-y-4 text-lg leading-relaxed" style={{ color: "black" }}>
                                <p>
                                    As-salamu alaykum! Welcome to Mujaddid Alsefani School, a place where timeless Islamic values meet purposeful modern education.
                                </p>
                                <p>
                                    Our vision is to build and nurture a learning community that shapes future leaders through faith, knowledge, and inspiration. We strive to ensure that our students grow not only in academic excellence but also in character, responsibility, and their role as contributors to the future of our nation.
                                </p>
                                <p>
                                    Guided by qualified Islamic scholars and experienced educators, we provide a balanced and holistic education that develops the spiritual, intellectual, and social foundations of every child—preparing them to lead with clarity, confidence, and values.
                                </p>
                            </div>
                        </motion.div>

                        {/* Image Grid Section - Updated grid-cols-1 for mobile */}
                        <motion.div variants={fadeInUp} className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-4">
                            {aboutUsImage.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    whileHover={{ scale: 1.02, rotate: 1 }}
                                    /* index > 1 ? 'hidden sm:block' : 'block' -> keeps only 2 images on mobile
                                       aspect-[16/9] sm:aspect-[4/5] -> wider images on mobile look better when stacked
                                    */
                                    className={`relative aspect-[16/9] sm:aspect-[4/5] overflow-hidden rounded-3xl shadow-xl 
                            ${index > 1 ? 'hidden sm:block' : 'block'} 
                            ${index % 2 !== 0 ? 'sm:mt-8' : ''} 
                            bg-emerald-600 border`}
                                >
                                    <img
                                        src={item.image}
                                        alt={`School gallery ${index + 1}`}
                                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                                    />
                                    {/* Subtle overlay for depth */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
                            Why Choose Us?
                        </h2>
                        <p className="text-xl text-slate-600">
                            Excellence in every aspect of education
                        </p>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                variants={fadeInUp}
                                whileHover={{ scale: 1.05 }}
                                className="bg-gradient-to-br from-emerald-50 to-white p-8 rounded-2xl border border-emerald-100 hover:border-emerald-300 transition-all cursor-pointer group"
                            >
                                <div className="w-14 h-14 bg-emerald-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-emerald-700 transition-colors">
                                    <feature.icon className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-800 mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-slate-600">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Programs Section */}
            <section className="py-24 bg-gradient-to-br from-slate-50 to-emerald-50" id="programs">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
                            Our Branches
                        </h2>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                            Education tailored for every stage of growth
                        </p>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    >
                        {programs.map((program, index) => (
                            <motion.div
                                key={index}
                                variants={fadeInUp}
                                whileHover={{ y: -10, scale: 1.02 }}
                                className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all group cursor-pointer"
                            >
                                <div className={`w-16 h-16 bg-gradient-to-br ${program.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                    <program.icon className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-800 mb-2">
                                    {program.title}
                                </h3>
                                <p className="text-slate-600 mb-4">
                                    {program.description}
                                </p>
                                {/* <button className="text-emerald-600 font-semibold flex items-center group-hover:translate-x-2 transition-transform">
                                    Learn More <ChevronRight className="ml-1" size={20} />
                                </button> */}
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>


            {/* Stats Section */}
            <section className="py-24 bg-gradient-to-r from-emerald-600 to-emerald-800 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    {[...Array(10)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-64 h-64 border-2 border-white rounded-full"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                            }}
                            animate={{
                                scale: [1, 1.5, 1],
                                opacity: [0.2, 0.5, 0.2],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                delay: Math.random() * 2,
                            }}
                        />
                    ))}
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                variants={fadeInUp}
                                className="text-center">
                                <motion.h3
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ type: "spring", delay: index * 0.1 }}
                                    className="text-5xl md:text-6xl font-bold text-white mb-2"
                                >
                                    {stat.number}
                                </motion.h3>
                                <p className="text-emerald-100 text-lg font-medium">
                                    {stat.label}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Events Section */}
            <section className="py-24 bg-white" id="events">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: "#1e293b" }}>
                            Upcoming Events
                        </h2>
                        <p className="text-xl" style={{ color: "#475569" }}>
                            Join us in our community activities
                        </p>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    >
                        {upcomingEvents.map((event, index) => (
                            <motion.div
                                key={index}
                                variants={fadeInUp}
                                whileHover={{ y: -10 }}
                                className="flex flex-col bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-100 group "
                            >
                                {/* Top Part: Image Container */}
                                <div className="relative h-56 overflow-hidden">
                                    <img
                                        src={event.imageUrl}
                                        alt={event.title}
                                        className="w-full h-full object-top object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    {/* Date Badge floating over image */}
                                    <div
                                        className="absolute bottom-4 left-4 text-white px-4 py-1.5 rounded-lg font-bold text-sm shadow-lg"
                                        style={{ backgroundColor: "#059669" }}
                                    >
                                        {event.date}
                                    </div>
                                </div>

                                {/* Bottom Part: Text Content */}
                                <div className="p-6 flex-grow flex flex-col">
                                    <div className="flex items-center mb-3">
                                        <Calendar size={18} style={{ color: "#059669" }} className="mr-2" />
                                        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">School Event</span>
                                    </div>

                                    <h3 className="text-xl font-bold mb-3 transition-colors group-hover:text-emerald-600" style={{ color: "#1e293b" }}>
                                        {event.title}
                                    </h3>

                                    <p className="text-sm leading-relaxed mb-4" style={{ color: "#475569" }}>
                                        {event.description}
                                    </p>

                                    {/* <div className="mt-auto pt-4 border-t border-slate-50">
                                        <span className="text-sm font-bold flex items-center" style={{ color: "#059669" }}>
                                            Read Details <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                                        </span>
                                    </div> */}
                                </div>
                            </motion.div>

                        ))}
                    </motion.div>

                    {/* View All Events Button */}
                    {upcomingEvents.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mt-12"
                        >
                            <Link to="/news-events">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all inline-flex items-center gap-2"
                                >
                                    View All Events
                                    <ChevronRight className="w-5 h-5" />
                                </motion.button>
                            </Link>
                        </motion.div>
                    )}

                    {/* Empty State */}
                    {upcomingEvents.length === 0 && (
                        <div className="text-center py-16 bg-white rounded-2xl">
                            <Calendar className="w-16 h-16 mx-auto mb-4 text-slate-400" />
                            <p className="text-xl font-semibold text-slate-600">
                                No upcoming events scheduled
                            </p>
                        </div>
                    )}
                </div>
            </section>

            {/* News & Highlights Section */}
            <section className="py-24 bg-slate-50" id="news">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="mb-16 text-center "
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: "#1e293b" }}>
                            News & Highlights
                        </h2>
                        <p className="text-xl" style={{ color: "#475569" }}>
                            Latest updates from Mujaddid Alsefani School
                        </p>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6 overflow-x-auto pb-8 md:pb-0 scrollbar-hide snap-x "
                    >
                        {upcomingNews.map((news, index) => (
                            <motion.div
                                key={index}
                                variants={fadeInUp}
                                whileHover={{ y: -10 }}
                                /* min-width ensures cards don't shrink too much on mobile */
                                className="flex-shrink-0 w-[85vw] md:w-auto snap-center flex flex-col bg-white rounded-3xl overflow-hidden shadow-md border border-slate-100 group cursor-pointer"
                            >
                                {/* Top Part: Image Container with Fixed Aspect Ratio */}
                                <div className="relative aspect-video overflow-hidden">
                                    <img
                                        src={news.imageUrl}
                                        alt={news.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div
                                        className="absolute top-4 left-4 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg"
                                        style={{ backgroundColor: "#059669" }}
                                    >
                                        News
                                    </div>
                                </div>

                                {/* Bottom Part: Text Content with fixed min-height for alignment */}
                                <div className="p-6 flex-grow flex flex-col justify-between">
                                    <div>
                                        <div className="text-xs font-bold mb-2" style={{ color: "#059669" }}>
                                            {news.date}, 2026
                                        </div>

                                        <h3 className="text-lg font-bold mb-3 line-clamp-2 transition-colors group-hover:text-emerald-600" style={{ color: "#1e293b" }}>
                                            {news.title}
                                        </h3>

                                        <p className="text-sm leading-relaxed line-clamp-3" style={{ color: "#475569" }}>
                                            {news.description}
                                        </p>
                                    </div>

                                    {/* <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between">
                                        <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "#059669" }}>Read More</span>
                                        <ArrowRight size={16} style={{ color: "#059669" }} className="group-hover:translate-x-1 transition-transform" />
                                    </div> */}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* View All News Button */}
                    {upcomingNews.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mt-12"
                        >
                            <Link to="/news-events">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all inline-flex items-center gap-2"
                                >
                                    View All News
                                    <ChevronRight className="w-5 h-5" />
                                </motion.button>
                            </Link>
                        </motion.div>
                    )}

                    {/* Empty State */}
                    {upcomingNews.length === 0 && (
                        <div className="text-center py-16 bg-white rounded-2xl">
                            <p className="text-xl font-semibold text-slate-600">
                                No current news available
                            </p>
                        </div>
                    )}
                </div>
            </section>

            {/* Embed map */}
            <section className="relative w-full bg-[#0f172a] overflow-hidden">
                <div className="flex flex-col lg:flex-row min-h-[500px]">

                    {/* Left Side: Google Map */}
                    <div className="w-full lg:w-1/2 h-[400px] lg:h-auto relative">
                        <style>{` .map-iframe-wrapper iframe { width: 100%; height: 100%; filter: grayscale(0.2) contrast(1.1); } `}</style>
                        <div className="map-iframe-wrapper w-full h-full">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3719.5597265390234!2d72.8006588743924!3d21.209641981543!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04c27eebdc1df%3A0x786f044bb2279b6d!2sMUJADDID%20ALFESANI%20BOYS&#39;%20%2F%20GIRLS&#39;%20SCHOOL!5e0!3m2!1sen!2sin!4v1697025471591!5m2!1sen!2sin"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="School Location"
                            ></iframe>
                        </div>
                    </div>

                    {/* Right Side: Contact Info */}
                    <div className="w-full lg:w-1/2 flex items-center justify-center p-12 lg:p-24 relative overflow-hidden"
                        style={{ backgroundColor: "#064e3b" }}>

                        {/* Subtle Pattern for Texture */}
                        <div className="absolute inset-0 opacity-5"
                            style={{ backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`, backgroundSize: '20px 20px' }}>
                        </div>

                        {/* Content */}
                        <div className="relative z-10 text-center text-white max-w-md">
                            <div className="flex justify-center mb-6">
                                <MapPin className="w-8 h-8 text-emerald-400 opacity-80" />
                            </div>

                            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-6 text-white">
                                Visit Our Campus
                            </h2>

                            <p className="text-lg leading-relaxed mb-10 text-emerald-50/80">
                                T.P. 23, Plot No 69, New Cause Way Road, Rander-Gorat, Surat, Gujarat 395005
                            </p>

                            <div className="flex flex-col space-y-4 items-center">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="inline-flex items-center space-x-3 px-8 py-3 rounded-full font-bold transition-all duration-300 shadow-xl"
                                    style={{ backgroundColor: "#ffffff", color: "#064e3b" }}
                                >
                                    <span className="text-sm uppercase tracking-wider">Get Directions</span>
                                    <ArrowRight className="w-5 h-5" />
                                </motion.button>

                                <a href="tel:+917359026258" className="text-emerald-300 text-sm font-medium hover:text-white transition-colors">
                                    Or call us: +91 73590 26258
                                </a>
                            </div>
                        </div>

                        {/* Simple Corner Accents */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full"></div>
                        <div className="absolute bottom-0 left-0 w-16 h-16 bg-emerald-400/10 rounded-tr-full"></div>
                    </div>
                </div>
            </section>

            {/* Scroll to Top Button */}
            <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: scrolled ? 1 : 0 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="fixed bottom-8 right-8 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white p-4 rounded-full shadow-2xl z-40 hover:shadow-emerald-500/50 transition-all"
            >
                <ChevronRight className="rotate-[-90deg]" size={24} />
            </motion.button>
        </div>
    );
};

export default HomePage;