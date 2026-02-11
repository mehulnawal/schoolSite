import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Award, BookOpen, GraduationCap } from 'lucide-react';
import teachingStaffBanner from '../assets/teaching/teachingStaffBanner.jpg';

const TeachingStaffPage = () => {
    const [selectedSchool, setSelectedSchool] = useState('girls-english');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

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

    const staffData = {
        'girls-english': {
            title: "M.A.GIRLS' ENGLISH SCHOOL",
            year: "2025-26",
            qualifications: [
                { qualification: 'Principal', total: '1' },
                { qualification: 'PGT', total: '22' },
                { qualification: 'TGT', total: '05' },
                { qualification: 'D.Ed.', total: '19' },
                { qualification: 'Total No. of teachers', total: '47' }
            ]
        },

        'boys-english': {
            title: "M.A. BOY'S ENGLISH SCHOOL",
            year: "2025-26",
            qualifications: [
                { qualification: 'Principal', total: '1' },
                { qualification: 'PGT', total: '23' },
                { qualification: 'TGT', total: '13' },
                { qualification: 'MONTESSORI', total: '2' },
                { qualification: 'D.Ed.', total: '2' },
                { qualification: 'Total No. of teachers', total: '48' }
            ]
        }
    };

    const currentStaff = staffData[selectedSchool];

    return (
        <div className="bg-slate-50 overflow-hidden">
            {/* Hero Banner Section */}
            <section className="relative min-h-[60vh] flex items-center overflow-hidden">
                <div className="absolute inset-0 w-full h-full">
                    <img
                        src={teachingStaffBanner}
                        alt="Teaching Staff"
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
                            ✨ Our Team
                        </motion.div>

                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 drop-shadow-2xl">
                            <span className="bg-gradient-to-r from-emerald-400 via-amber-400 to-emerald-300 bg-clip-text text-transparent">
                                Teaching Staff
                            </span>
                        </h1>

                        <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 leading-relaxed drop-shadow-lg">
                            Dedicated educators shaping future leaders
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Main Content Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Staff Details Header */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="mb-8"
                    >
                        <h2 className="text-3xl font-bold mb-2" style={{ color: "#1e293b" }}>
                            Staff Details {currentStaff.year}
                        </h2>
                    </motion.div>

                    {/* School Selection Tabs */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="mb-12"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <button
                                onClick={() => setSelectedSchool('girls-english')}
                                className={`px-6 py-3 rounded-lg font-semibold text-sm transition-all ${selectedSchool === 'girls-english'
                                    ? 'bg-slate-800 text-white shadow-xl'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                    }`}
                            >
                                M.A. Girl's English School
                            </button>
                            <button
                                onClick={() => setSelectedSchool('boys-english')}
                                className={`px-6 py-3 rounded-lg font-semibold text-sm transition-all ${selectedSchool === 'boys-english'
                                    ? 'bg-slate-800 text-white shadow-xl'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                    }`}
                            >
                                M.A. Boy's English School
                            </button>
                        </div>
                    </motion.div>

                    {/* Two Column Layout */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="grid md:grid-cols-2 gap-8"
                    >
                        {/* Left Column - Staff Qualifications Table */}
                        <motion.div variants={fadeInUp}>
                            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
                                {/* Table Header */}
                                <div className="bg-slate-800 text-white px-6 py-4">
                                    <h3 className="text-xl font-bold text-center">
                                        {currentStaff.title}
                                    </h3>
                                </div>

                                {/* Table Content */}
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="bg-slate-50 border-b border-slate-200">
                                                <th className="px-6 py-3 text-left font-bold text-slate-800">
                                                    Teacher's Qualification
                                                </th>
                                                <th className="px-6 py-3 text-left font-bold text-slate-800">
                                                    Total No.
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentStaff.qualifications.map((item, index) => (
                                                <motion.tr
                                                    key={index}
                                                    variants={fadeInUp}
                                                    className={`border-b border-slate-200 hover:bg-emerald-50/50 transition-colors ${item.qualification === 'Total No. of teachers'
                                                        ? 'bg-slate-100 font-bold'
                                                        : ''
                                                        }`}
                                                >
                                                    <td className="px-6 py-4 text-slate-800">
                                                        {item.qualification}
                                                    </td>
                                                    <td className="px-6 py-4 text-slate-800">
                                                        {item.total}
                                                    </td>
                                                </motion.tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </motion.div>

                        {/* Right Column - Description */}
                        <motion.div variants={fadeInUp}>
                            <div className="bg-gradient-to-br from-emerald-50 to-white rounded-2xl p-8 shadow-lg border border-emerald-100 h-full">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center">
                                        <Users className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-1">
                                            Our Educators
                                        </p>
                                        <h3 className="text-2xl font-bold" style={{ color: "#1e293b" }}>
                                            Teaching Staff
                                        </h3>
                                    </div>
                                </div>

                                <div className="space-y-4 text-lg leading-relaxed" style={{ color: "#475569" }}>
                                    <p>
                                        At M.A. Group of Schools, our teachers are well-trained, highly qualified, and deeply passionate about education. They are dedicated to nurturing each student's potential with empathy and understanding, ensuring a supportive and inspiring learning environment.
                                    </p>

                                    {/* Stats Cards */}
                                    <div className="grid grid-cols-2 gap-4 mt-8">
                                        <div className="bg-white rounded-xl p-4 shadow-md border border-emerald-100">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Award className="w-5 h-5 text-emerald-600" />
                                                <p className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                                                    Qualified
                                                </p>
                                            </div>
                                            <p className="text-2xl font-bold" style={{ color: "#1e293b" }}>
                                                100%
                                            </p>
                                            <p className="text-xs" style={{ color: "#475569" }}>
                                                Certified Teachers
                                            </p>
                                        </div>

                                        <div className="bg-white rounded-xl p-4 shadow-md border border-emerald-100">
                                            <div className="flex items-center gap-2 mb-2">
                                                <GraduationCap className="w-5 h-5 text-emerald-600" />
                                                <p className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                                                    Experience
                                                </p>
                                            </div>
                                            <p className="text-2xl font-bold" style={{ color: "#1e293b" }}>
                                                10+
                                            </p>
                                            <p className="text-xs" style={{ color: "#475569" }}>
                                                Years Average
                                            </p>
                                        </div>

                                        <div className="bg-white rounded-xl p-4 shadow-md border border-emerald-100">
                                            <div className="flex items-center gap-2 mb-2">
                                                <BookOpen className="w-5 h-5 text-emerald-600" />
                                                <p className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                                                    Ratio
                                                </p>
                                            </div>
                                            <p className="text-2xl font-bold" style={{ color: "#1e293b" }}>
                                                1:12
                                            </p>
                                            <p className="text-xs" style={{ color: "#475569" }}>
                                                Teacher to Student
                                            </p>
                                        </div>

                                        <div className="bg-white rounded-xl p-4 shadow-md border border-emerald-100">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Users className="w-5 h-5 text-emerald-600" />
                                                <p className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                                                    Total
                                                </p>
                                            </div>
                                            <p className="text-2xl font-bold" style={{ color: "#1e293b" }}>
                                                {currentStaff.qualifications[currentStaff.qualifications.length - 1].total}
                                            </p>
                                            <p className="text-xs" style={{ color: "#475569" }}>
                                                Teaching Staff
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

        </div>
    );
};

export default TeachingStaffPage;