import React, { useState, useEffect } from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
    Menu, X, ChevronRight, BookOpen, Users, Award,
    Calendar, Star, Phone, Mail, MapPin, ArrowRight,
    GraduationCap, Heart, Shield, Sparkles
} from 'lucide-react';

// banner image
import schoolBannerImg from '../assets/banner/school-banner-img.jfif'

// logo
import schoolLogoGreen from '../assets/logo/schoolLogoGreen.png'

// about image
import aboutImg1 from '../assets/about_us/aboutUs_img1.jfif'
import aboutImg2 from '../assets/about_us/aboutUs_img2.jfif'
import aboutImg3 from '../assets/about_us/aboutUs_img3.jfif'
import aboutImg4 from '../assets/about_us/aboutUs_img4.jfif'

// events 
import eventImage1 from '../assets/events/repulicDay.jpg'
import eventImage2 from '../assets/events/scienceFailt.jpg'
import eventImage3 from '../assets/events/annualDay.jpg'

// news
import news1 from '../assets/news/HSCBoardResults.jpg'

const HomePage = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { scrollYProgress } = useScroll();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
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
            title: "Elementary School",
            description: "Building strong academic foundation with comprehensive Islamic education",
            icon: BookOpen,
            color: "from-blue-500 to-cyan-500"
        },
        // {
        //     title: "Islamic Studies",
        //     description: "Deep understanding of Quran, Hadith, and Islamic principles",
        //     icon: Star,
        //     color: "from-amber-500 to-orange-500"
        // },
        {
            title: "Extracurricular",
            description: "Sports, arts, and activities for holistic development",
            icon: Sparkles,
            color: "from-purple-500 to-pink-500"
        }
    ];

    const features = [

        {

            icon: GraduationCap,

            title: "Dual Board Options",

            description: "Offering both CBSE and GSEB (Gujarat Board) curriculum for diverse academic paths."

        },

        {

            icon: Award,

            title: "Deeni & Dunyawi Education",

            description: "High-quality academic standards integrated with deep-rooted Islamic values."

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

    const events = [
        {
            date: "Jan 26",
            title: "Republic Day",
            description: "Celebration of Republic Day with flag hoisting, cultural programs, and patriotic activities",
            image: eventImage1
        },
        {
            date: "Feb 4",
            title: "Annual Day",
            description: "A grand celebration showcasing students talents through performances and award ceremonies",
            image: eventImage3
        },
        {
            date: "Mar 5",
            title: "Science Fair",
            description: "Exhibition of innovative science projects and experiments presented by students",
            image: eventImage2
        }
    ];

    const newsHighlights = [
        {
            date: "Jan 15",
            title: "100% Board Results",
            description: "M.A. Group of Schools is proud to announce 100% board results this year. Congratulations to our dedicated students, teachers, and supportive parents. Here's to continued excellence!",
            image: news1
        },
        // {
        //     date: "Jan 10",
        //     title: "New STEM Lab Inaugurated",
        //     description: "Enhancing our GSEB and CBSE wings with state-of-the-art laboratory equipment for practical learning.",
        //     image: aboutImg1
        // },
        // {
        //     date: "Jan 05",
        //     title: "Islamic Quiz Competition",
        //     description: "Students from all branches participated in our annual Deeniyat quiz, showing impressive knowledge of Islamic history.",
        //     image: aboutImg2
        // }
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
                className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-amber-500 z-50 origin-left"
                style={{ scaleX: scrollYProgress }}
            />

            {/* Navbar */}
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className={`fixed w-full z-40 transition-all duration-300 ${scrolled
                    ? 'bg-white/95 backdrop-blur-md shadow-lg'
                    : 'bg-gradient-to-b from-black/60 to-transparent backdrop-blur-sm'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        {/* Logo */}
                        <motion.div
                            className="flex items-center space-x-3"
                            whileHover={{ scale: 1.05 }}
                        >
                            <div className="flex items-start">
                                <img src={schoolLogoGreen} className="w-[52px] h-14"
                                    alt="School Logo" />
                                <div>
                                    <h1 className={`text-md lg:text-xl font-bold ${scrolled ? 'text-slate-800' : 'text-white drop-shadow-lg'}`}>
                                        Mujaddid Alsefani School
                                    </h1>
                                    <p className={`text-xs ${scrolled ? 'text-emerald-600' : 'text-emerald-200 drop-shadow-lg'}`}>
                                        المعرفة نور
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center space-x-8">
                            {['Home', 'About', 'Programs', 'Admissions', 'Contact'].map((item) => (
                                <motion.a
                                    key={item}
                                    href={`#${item.toLowerCase()}`}
                                    className={`font-medium relative group ${scrolled
                                        ? 'text-slate-700 hover:text-emerald-600'
                                        : 'text-white hover:text-emerald-300 drop-shadow-lg'
                                        }`}
                                    whileHover={{ y: -2 }}
                                >
                                    {item}
                                    <span
                                        className={`absolute -bottom-1 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300 ${scrolled ? 'bg-emerald-600' : 'bg-white'
                                            }`}
                                    />
                                </motion.a>
                            ))}
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`px-6 py-2 rounded-full font-medium shadow-lg transition-all ${scrolled
                                    ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-emerald-500/30'
                                    : 'bg-white text-emerald-700 shadow-white/30'
                                    }`}
                            >
                                Apply Now
                            </motion.button>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className={`md:hidden z-10 ${scrolled ? 'text-slate-700' : 'text-white drop-shadow-lg'}`}
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
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden bg-white border-t"
                        >
                            <div className="px-4 py-6 space-y-4 shadow-lg">
                                {['Home', 'About', 'Programs', 'Admissions', 'Contact'].map((item) => (
                                    <a
                                        key={item}
                                        href={`#${item.toLowerCase()}`}
                                        className="block text-slate-700 hover:text-emerald-600 font-medium py-2"
                                    >
                                        {item}
                                    </a>
                                ))}
                                {/* <button className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-6 py-3 rounded-full font-medium">
                                    Apply Now
                                </button> */}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center overflow-hidden">
                <div className="absolute inset-0 w-full h-full">
                    <img
                        src={schoolBannerImg}
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
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="inline-block bg-white/20 backdrop-blur-md text-white border border-white/30 px-4 py-2 rounded-full text-sm font-medium mb-6"
                            >
                                ✨ Admissions Open for 2026-27
                            </motion.div>

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

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-colors backdrop-blur-sm"
                                >
                                    Learn More
                                </motion.button>
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
                            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: "black" }}>
                                About Us
                            </h2>
                            <div className="space-y-4 text-lg leading-relaxed" style={{ color: "black" }}>
                                <p>
                                    As-salamu alaykum! Welcome to Mujaddid Alsefani School, where we combine the timeless wisdom of Islamic education with modern academic excellence.
                                </p>
                                <p>
                                    Our vision is to build and maintain a learning community that produces leaders through faith, knowledge, and inspiration. We wish to see our students excel not only in academics but in their role as the future of our country.
                                </p>
                                <p>
                                    Our dedicated team of qualified Islamic scholars and experienced educators work together to provide a comprehensive education that develops the spiritual, intellectual, and social dimensions of each child.
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
                        className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
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
                        {events.map((event, index) => (
                            <motion.div
                                key={index}
                                variants={fadeInUp}
                                whileHover={{ y: -10 }}
                                className="flex flex-col bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-100 group cursor-pointer"
                            >
                                {/* Top Part: Image Container */}
                                <div className="relative h-56 overflow-hidden">
                                    <img
                                        src={event.image}
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
                        className="mb-12"
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
                        /* Flex layout that turns into a scrollable row if items exceed screen width */
                        className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto pb-8 md:pb-0 scrollbar-hide snap-x"
                    >
                        {newsHighlights.map((news, index) => (
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
                                        src={news.image}
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

            {/* Join Our Community */}
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
                            <motion.button
                                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-white text-emerald-800 px-10 py-4 rounded-full font-bold text-lg shadow-2xl hover:bg-emerald-50 transition-all flex items-center"
                            >
                                Start Application <ArrowRight className="ml-2" size={20} />
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="border-2 border-white/40 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-all backdrop-blur-sm"
                            >
                                Inquire Now
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-slate-900 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-4">
                    <div className="grid md:grid-cols-4 gap-12 mb-12">
                        {/* About */}
                        <div className="md:col-span-2">
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-lg flex items-center justify-center">
                                    <BookOpen className="w-7 h-7 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold">Mujaddid Alsefani School</h3>
                                    <p className="text-sm text-emerald-400">المعرفة نور</p>
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
                                {['About Us', 'Programs', 'Admissions', 'Faculty', 'Gallery', 'News & Events'].map((link, index) => (
                                    <motion.li key={index} whileHover={{ x: 5 }}>
                                        <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center">
                                            <ChevronRight size={16} className="mr-1" />
                                            {link}
                                        </a>
                                    </motion.li>
                                ))}
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
            </footer>

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