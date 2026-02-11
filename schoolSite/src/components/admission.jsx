import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, FileText, Clock, CheckCircle, Phone } from 'lucide-react';

import classroomImg from '../assets/admission/classroomImg.jfif'
import AdmissionsBannerImg from '../assets/admission/AdmissionsBannerImg.jpg'

import { getDatabase, ref, onValue } from "firebase/database";
import { app } from "../components/firebase";
import toast from "react-hot-toast";

const AdmissionPage = () => {

    const [downloadEnabled, setDownloadEnabled] = useState(false);


    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    useEffect(() => {
        const db = getDatabase(app);
        const dashboardRef = ref(db, "dashboard");

        const unsubscribe = onValue(dashboardRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                setDownloadEnabled(data.downloadFormEnabled ?? false);
            }
        });

        return () => unsubscribe();
    }, []);


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
                staggerChildren: 0.1
            }
        }
    };

    const requirements = [
        "Admissions are open to both Boys & Girls on the basis of merit.",
        "Admissions are made on the basis of priority of registration and availability of seats.",
        "Filled up Application form with necessary documents and registration fee should be submitted before last date of submission.",
        "Students applying for admission are subject to entrance test.",
        "Due to some technical problems, for this year we are unable to put up the inquiry forms on the website."
    ];

    return (
        <div className="bg-slate-50 overflow-hidden">
            {/* Hero Banner Section */}
            <section className="relative min-h-[60vh] flex items-center overflow-hidden">
                <div className="absolute inset-0 w-full h-full">
                    <img
                        src={AdmissionsBannerImg}
                        alt="Admission"
                        className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/60"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-20">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-block bg-white/20 backdrop-blur-md text-white border border-white/30 px-4 py-2 rounded-full text-sm font-medium mb-6"
                        >
                            ✨ Join Us
                        </motion.div>

                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 drop-shadow-2xl">
                            <span className="bg-gradient-to-r from-emerald-400 via-amber-400 to-emerald-300 bg-clip-text text-transparent">
                                Admission
                            </span>
                        </h1>

                        <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 leading-relaxed drop-shadow-lg">
                            Begin your journey towards excellence in education
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Main Content Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Two Column Layout */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="grid lg:grid-cols-2 gap-8"
                    >
                        {/* Left Column - Admission Details */}
                        <motion.div variants={fadeInUp} className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 lg:p-10">
                            {/* Header Badge */}
                            <div className="inline-block bg-amber-100 text-amber-700 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-6">
                                For bright future
                            </div>

                            {/* Main Title */}
                            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: "#1e293b" }}>
                                Apply for admission
                            </h2>

                            {/* Advertisement Notice */}
                            <p className="text-lg leading-relaxed mb-8" style={{ color: "#475569" }}>
                                An advertisement in leading News Papers, Local TV Channels & Hoardings will be given in the month of December & January this year.
                            </p>

                            {/* Requirements Section */}
                            <div className="mb-8">
                                <h3 className="text-xl font-bold mb-4 flex items-center" style={{ color: "#059669" }}>
                                    <FileText className="w-6 h-6 mr-2" />
                                    Requirements:
                                </h3>

                                <ul className="space-y-4">
                                    {requirements.map((requirement, index) => (
                                        <motion.li
                                            key={index}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.1 }}
                                            className="flex items-start"
                                        >
                                            <CheckCircle className="w-5 h-5 text-emerald-600 mr-3 mt-0.5 flex-shrink-0" />
                                            <span className="text-base leading-relaxed" style={{ color: "#475569" }}>
                                                {requirement}
                                            </span>
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>

                            {/* Contact Notice */}
                            <div className="bg-gradient-to-br from-emerald-50 to-white rounded-2xl p-6 border-l-4 border-emerald-600 mb-6">
                                <p className="text-lg font-semibold mb-2" style={{ color: "#1e293b" }}>
                                    Request the parents to please contact the school window for the same.
                                </p>
                                <div className="flex items-center text-emerald-700 font-bold">
                                    <Clock className="w-5 h-5 mr-2" />
                                    <span>Timing: 09:00am to 12:00pm</span>
                                </div>
                            </div>

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-emerald-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:bg-emerald-700 transition-all flex items-center justify-center"
                                >
                                    <Phone className="w-5 h-5 mr-2" />
                                    Contact Us
                                </motion.button>

                                <motion.button
                                    whileHover={downloadEnabled ? { scale: 1.05 } : {}}
                                    whileTap={downloadEnabled ? { scale: 0.95 } : {}}
                                    onClick={() => {
                                        if (!downloadEnabled) {
                                            toast.error("Form download is currently unavailable. Please contact school office.");
                                            return;
                                        }

                                        // 🔥 Put your download logic here
                                        window.open("/admission-form.pdf", "_blank");
                                    }}
                                    className={`px-8 py-4 rounded-full font-bold text-lg transition-all
        ${downloadEnabled
                                            ? "border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 cursor-pointer"
                                            : "border-2 border-gray-400 text-gray-400 bg-gray-100 cursor-not-allowed"
                                        }`}
                                >
                                    Download Form
                                </motion.button>

                            </div>
                        </motion.div>

                        {/* Right Column - Classroom Image */}
                        <motion.div variants={fadeInUp} className="relative">
                            <div className="sticky top-8">
                                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                                    <img
                                        src={classroomImg}
                                        alt="Modern Classroom"
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>

                                    {/* Floating Badge */}
                                    <div className="absolute bottom-6 left-6 right-6">
                                        <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center">
                                                    <GraduationCap className="w-6 h-6 text-white" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold" style={{ color: "#1e293b" }}>
                                                        Modern Learning Environment
                                                    </p>
                                                    <p className="text-xs" style={{ color: "#475569" }}>
                                                        Smart classrooms with latest facilities
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Admission Process Section */}
            {/* <section className="py-24 bg-gradient-to-br from-slate-50 to-emerald-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: "#1e293b" }}>
                            Admission Process
                        </h2>
                        <p className="text-xl" style={{ color: "#475569" }}>
                            Simple steps to join our educational family
                        </p>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="grid md:grid-cols-4 gap-6"
                    >
                        {[
                            { step: '01', title: 'Inquiry', description: 'Visit school or call during office hours', icon: Phone },
                            { step: '02', title: 'Registration', description: 'Fill form with required documents', icon: FileText },
                            { step: '03', title: 'Entrance Test', description: 'Student appears for assessment', icon: GraduationCap },
                            { step: '04', title: 'Admission', description: 'Complete formalities and join', icon: CheckCircle }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                variants={fadeInUp}
                                whileHover={{ y: -10 }}
                                className="bg-white rounded-2xl p-6 shadow-lg border border-emerald-100 hover:border-emerald-300 transition-all text-center"
                            >
                                <div className="w-16 h-16 bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <item.icon className="w-8 h-8 text-white" />
                                </div>
                                <div className="text-4xl font-bold mb-2" style={{ color: "#059669" }}>
                                    {item.step}
                                </div>
                                <h3 className="text-xl font-bold mb-2" style={{ color: "#1e293b" }}>
                                    {item.title}
                                </h3>
                                <p className="text-sm" style={{ color: "#475569" }}>
                                    {item.description}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section> */}
        </div>
    );
};

export default AdmissionPage;