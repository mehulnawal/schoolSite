import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Quote, BookOpen } from 'lucide-react';

import PrincipalDeskBanner from '../assets/aboutUs/principal/Principal-Desk-Banner.jpg'

// Placeholder images - replace these with actual images
const principalImage1 = '/path/to/urusa-saiyed.jpg';
const principalImage2 = '/path/to/safia-multani.jpg';
const principalImage3 = '/path/to/shabana-kazi.jpg';

const PrincipalPage = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    const [openSection, setOpenSection] = useState(null);

    const toggleSection = (index) => {
        setOpenSection(openSection === index ? null : index);
    };

    // Animation variants (same as home page)
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

    const principals = [
        {
            id: 1,
            name: "Urusa Saiyed",
            title: "Principal, Alfesani Boys' English Medium School",
            image: null,
            message: [
                '"Education is the passport to the future, for tomorrow belongs to those who prepare for it today."',
                "As the Principal of ALFESANI BOYS' ENGLISH MEDIUM SCHOOL, I am deeply committed to shaping a vision that harmoniously combines the timeless values of Islam with a modern approach to education. I believe education is the overall development of a child and not something confined only to academic grades and scores. Knowledge is about what you have learnt, what you know, what you do, what you are, and what you share. It ultimately becomes the way of life you choose.",
                'We at ALFESANI are committed to keeping our motto, "Knowledge is Light," alive and thriving through our staff and students, guiding them toward a purposeful and enlightened future.'
            ]
        },
        {
            id: 2,
            name: "Safia Maqsud Multani",
            title: "Principal, M.A. Girls' English School",
            image: null,
            greeting: "Assalamu Alaikum,",
            message: [
                'The Prophet Muhammad (PBUH) said: "For him who follows a path for seeking knowledge, Allah will ease for him the path to Paradise." (Muslim)',
                "Our institution firmly believes in these words and remains dedicated to nurturing young minds and souls. Our mission is to provide a holistic education that not only imparts knowledge but also instills compassion, integrity, and a deep understanding of our Islamic heritage.",
                "Our commitment to academic excellence is matched by our dedication to creating an environment of inclusivity and respect for diverse backgrounds and perspectives. In challenging times, our faith and unity remain our pillars of strength. Our faculty and staff are always here to guide and support students, while the consistent encouragement of parents continues to strengthen our journey. I sincerely thank parents for their continuous faith in us.",
                '"We believe in Education with a difference to make a difference."',
                "With warm regards."
            ]
        },
        {
            id: 3,
            name: "Mrs. Shabana Kazi, M.A., B.Ed",
            title: "Principal, M.A. Girls' Secondary School (Gujarati Medium)",
            image: null,
            message: [
                '"Girls are Future, Let them grow and educate." "Boys, keep going… Do something now; your future self will thank you later."',
                "I feel honored and privileged to serve as Principal of Alfesani Education Trust's M.A. Girls' Secondary School since June 2004 and previously as Principal of M.A. Girls' English Primary School from 2005 to 2013.",
                'We believe education is not preparation for life; education is life itself. Our Quran says "IQRA\' bismi rabbikallazi khalaq," and this belief continues to guide our mission. Our community has often fallen behind due to lack of education, and it is our responsibility to uplift society through learning.',
                "Our focus is to provide a supportive environment where children grow into healthy, confident individuals. Our staff works with dedication and care, honoring the trust parents place in us every day. Our academic and curricular activities are designed to develop intellectual, social, and personal strengths, helping students stand confidently in society.",
                "As a not-for-profit institution, all financial surpluses are reinvested in improving education for present and future students. I believe strongly in teamwork and in leading with trust and confidence.",
                '"I always love to be a Leader and not a Boss."'
            ]
        }
    ];

    return (
        <div className="bg-slate-50 overflow-hidden">

            {/* Hero Banner Section */}
            <div className="relative h-[500px] overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${PrincipalDeskBanner})` }}
                >
                    {/* Darker overlay for better text visibility */}
                    <div className="absolute inset-0 bg-black/60" />
                </div>

                <div className="relative h-full flex flex-col items-center justify-center text-white px-4">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <BookOpen className="w-8 h-8 drop-shadow-lg" />
                            <span className="text-xl font-semibold drop-shadow-lg">✨ About Us</span>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-2xl">
                            Principal's Desk
                        </h1>
                        <p className="text-xl md:text-2xl text-white drop-shadow-lg">
                            Messages from our esteemed educational leaders
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Trust Information Banner */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="max-w-4xl mx-auto -mt-16 relative z-10 px-4 mb-0"
            >
                <div className="bg-white rounded-2xl shadow-2xl p-8 border-4 border-emerald-500">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-emerald-800 mb-2">
                            From the Principal's Desk
                        </h2>
                        <div className="inline-block bg-emerald-100 px-6 py-2 rounded-full">
                            <p className="text-emerald-700 font-semibold">
                                Words of wisdom and guidance from our principals
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Principals Section */}
            <section className="py-5 bg-white">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: "#1e293b" }}>

                        </h2>
                        <p className="text-xl" style={{ color: "#475569" }}>

                        </p>
                    </motion.div> */}

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="space-y-6"
                    >
                        {principals.map((principal, index) => (
                            <motion.div
                                key={principal.id}
                                variants={fadeInUp}
                                className="bg-white rounded-3xl overflow-hidden shadow-lg border border-emerald-100 hover:border-emerald-300 transition-all"
                            >
                                {/* Accordion Header */}
                                <button
                                    onClick={() => toggleSection(index)}
                                    className="w-full px-8 py-6 flex items-center justify-between hover:bg-emerald-50/50 transition-colors group"
                                >
                                    <div className="text-left">
                                        <h3 className="text-2xl font-bold mb-2 group-hover:text-emerald-600 transition-colors" style={{ color: "#1e293b" }}>
                                            {principal.name}
                                        </h3>
                                        <p className="text-lg font-medium" style={{ color: "#059669" }}>
                                            {principal.title}
                                        </p>
                                    </div>

                                    <motion.div
                                        animate={{ rotate: openSection === index ? 180 : 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="flex-shrink-0 ml-4"
                                    >
                                        <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center group-hover:bg-emerald-700 transition-colors">
                                            <ChevronDown className="w-6 h-6 text-white" />
                                        </div>
                                    </motion.div>
                                </button>

                                {/* Accordion Content */}
                                <AnimatePresence>
                                    {openSection === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.4, ease: "easeInOut" }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-8 pb-8 pt-4 border-t border-emerald-100">
                                                <div className="flex flex-col md:flex-row gap-8">

                                                    <motion.div
                                                        initial={{ opacity: 0, x: -20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: 0.2 }}
                                                        className="flex-shrink-0"
                                                    >
                                                        {
                                                            principal.image ?
                                                                <div className="w-48 h-48 rounded-2xl overflow-hidden shadow-xl border-4 border-emerald-100">
                                                                    <img
                                                                        src={principal.image}
                                                                        alt={principal.name}
                                                                        className="w-full h-full object-cover"
                                                                    />
                                                                </div>
                                                                : ''
                                                        }
                                                    </motion.div>

                                                    {/* Message Content */}
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: 0.3 }}
                                                        className="flex-grow"
                                                    >
                                                        <div className="relative">
                                                            <Quote className="absolute -top-2 -left-2 w-10 h-10 text-emerald-200" />
                                                            <div className="pl-8 space-y-4">
                                                                {principal.greeting && (
                                                                    <p className="text-lg font-semibold italic" style={{ color: "#059669" }}>
                                                                        {principal.greeting}
                                                                    </p>
                                                                )}
                                                                {principal.message.map((paragraph, pIndex) => (
                                                                    <p
                                                                        key={pIndex}
                                                                        className="text-lg leading-relaxed"
                                                                        style={{ color: "#475569" }}
                                                                    >
                                                                        {paragraph}
                                                                    </p>
                                                                ))}
                                                            </div>
                                                        </div>

                                                        {/* Signature Line */}
                                                        {/* <div className="mt-6 pt-6 border-t border-slate-100">
                                                            <p className="text-lg font-bold" style={{ color: "#1e293b" }}>
                                                                — {principal.name}
                                                            </p>
                                                            <p className="text-sm font-medium" style={{ color: "#059669" }}>
                                                                {principal.title}
                                                            </p>
                                                        </div> */}
                                                    </motion.div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default PrincipalPage;