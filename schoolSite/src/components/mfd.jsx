import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, Download } from 'lucide-react';
import mpdBanner from '../assets/mpd/mpdBanner.jpeg';


const MPD = () => {
    const [selectedTab, setSelectedTab] = useState('school-area');

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

    const infrastructureData = {
        'school-area': {
            title: 'School Area Details',
            data: [
                { label: 'Auditorium', value: '30 x 64 ft' },
                { label: 'Computer LAB', value: '20 x 30 ft' },
                { label: 'Class Area', value: '20 x 30 ft' },
                { label: 'Number of classes', value: '51' },
                { label: 'Total Campus Area', value: '2528 Sqr Mt' },
                { label: 'Play ground Area', value: '3020 Sqr Mt' }
            ]
        },
        'total-toilets': {
            title: 'Total Toilets',
            data: [
                { label: 'Staff', value: '06' },
                { label: 'For Students (Western)', value: '07' },
                { label: 'For Students (Indian)', value: '20' },
            ]
        },
        'gujarati-medium': {
            title: 'Gujarati Medium',
            data: [
                { label: 'School Name', value: 'Registration Number' },
                { label: 'Mujaddid Alfesani Primary School (25/01/1997)', value: '૨૯ /ખપશ/માન્યતા/૯૭/છ- સુરત' },
                { label: 'M.A.Boys Secondary School (04/09/2004)', value: 'મઉમશબ/ગ/૧૪૪૦૨/૦૫' },
                { label: 'M.A.Girls Secondary School (04/09/2004)', value: 'મઉમશબ/ગ/ટે–૬/જુન-૦૪/૧૪૪૨૬-૨૯c' },
                { label: 'MA Girls higher Secondary School (15/08/2007)', value: 'મઉમશબ/હ/નશા/જુન-૦૭/ ૨૧૫૮-૨૨૮૮' }
            ]
        },
        'english-medium': {
            title: 'English Medium',
            data: [
                { label: 'School Name', value: 'Registration Number' },
                { label: 'M.A.Girls Primary English School (09/03/2005)', value: 'પ્રાથમિક /ખપશ/માન્યતા/ ૨૭/ ૨૧૫૭૦' },
                { label: 'M.A.Girls Secondary English School (15/11/2014)', value: 'મઉમશબ/શાનિ/ટે-/જુન-૧૩/૩૫૫૭૨/૭૫' },
                { label: 'M.A.Boys Primary English School (07/06/2011)', value: 'પ્રાથમિક /નવી શાળા/મંજુરી/ ૨૦૧૧/૩ ૨૪૭૭૧ થી ૨૪૭૭૩' },
                { label: 'MA.Boys Secondary English School (30/01/2017)', value: 'મઉમશબ/શાનિ/જુન-૧૬/૨૭૦૭૮/૮૧' }
            ]
        }
    };

    const currentData = infrastructureData[selectedTab];

    const tabs = [
        { id: 'school-area', label: 'School Area Details', color: 'slate' },
        { id: 'total-toilets', label: 'Total Toilets', color: 'amber' },
        { id: 'gujarati-medium', label: 'Gujarati Medium', color: 'amber' },
        { id: 'english-medium', label: 'English Medium', color: 'amber' }
    ];

    return (
        <div className="bg-slate-50 overflow-hidden">
            {/* Hero Banner Section */}
            <section className="relative min-h-[60vh] flex items-center overflow-hidden">
                <div className="absolute inset-0 w-full h-full">
                    <img
                        src={mpdBanner}
                        alt="Infrastructure"
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
                            ✨ Facilities
                        </motion.div>

                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 drop-shadow-2xl">
                            <span className="bg-gradient-to-r from-emerald-400 via-amber-400 to-emerald-300 bg-clip-text text-transparent">
                                Infrastructure
                            </span>
                        </h1>

                        <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 leading-relaxed drop-shadow-lg">
                            World-class facilities for holistic development
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Main Content Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Tabs */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="mb-12"
                    >
                        <div className="flex flex-wrap gap-3">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setSelectedTab(tab.id)}
                                    className={`px-6 py-3 rounded-lg font-semibold text-sm transition-all ${selectedTab === tab.id
                                        ? tab.color === 'slate'
                                            ? 'bg-slate-800 text-white shadow-xl'
                                            : 'bg-amber-100 text-amber-800 border-2 border-amber-300 shadow-lg'
                                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border-2 border-transparent'
                                        }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </motion.div>

                    {/* Two Column Layout */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="grid lg:grid-cols-2 gap-8"
                    >
                        {/* Left Column - Table */}
                        <motion.div variants={fadeInUp} className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <tbody>
                                        {currentData.data.map((item, index) => (
                                            <motion.tr
                                                key={index}
                                                variants={fadeInUp}
                                                className="border-b border-slate-200 hover:bg-emerald-50/50 transition-colors"
                                            >
                                                <td className="px-6 py-4 font-semibold text-slate-800 border-r border-slate-200">
                                                    {item.label}
                                                </td>
                                                <td className="px-6 py-4 text-slate-600 font-medium">
                                                    {item.value}
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </motion.div>

                        {/* Right Column - MPD Section */}
                        <motion.div variants={fadeInUp}>
                            <div className="bg-gradient-to-br from-emerald-50 to-white rounded-2xl p-8 shadow-lg border border-emerald-100 h-full flex flex-col justify-center">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center">
                                        <Building2 className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-1">
                                            Transparency
                                        </p>
                                        <h3 className="text-2xl font-bold" style={{ color: "#1e293b" }}>
                                            Mandatory Public Disclosure
                                        </h3>
                                    </div>
                                </div>

                                <p className="text-lg leading-relaxed mb-6" style={{ color: "#475569" }}>
                                    As per CBSE guidelines, we ensure complete transparency in our operations. Download our Trust Certificate and other mandatory documents to know more about our institution.
                                </p>

                                {/* Download Button */}
                                <motion.a
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    href="/path/to/trust-certificate.pdf"
                                    download
                                    className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                                >
                                    <Download className="w-5 h-5" />
                                    Click here to download the Trust Certificate
                                </motion.a>

                                {/* Additional Info */}
                                {/* <div className="mt-6 pt-6 border-t border-slate-200">
                                    <p className="text-sm" style={{ color: "#475569" }}>
                                        All documents are updated as per latest CBSE norms and regulations.
                                    </p>
                                </div> */}
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
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
                            Our Facilities
                        </h2>
                        <p className="text-xl" style={{ color: "#475569" }}>
                            Modern infrastructure for comprehensive learning
                        </p>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {[
                            { title: 'Smart Classrooms', description: 'Equipped with digital boards and modern teaching aids' },
                            { title: 'Science Laboratories', description: 'Well-equipped labs for Physics, Chemistry, and Biology' },
                            { title: 'Computer Labs', description: 'Latest computers with high-speed internet connectivity' },
                            { title: 'Library', description: 'Extensive collection of books and digital resources' },
                            { title: 'Sports Facilities', description: 'Large playground and indoor sports facilities' },
                            { title: 'Auditorium', description: 'Spacious auditorium for events and assemblies' }
                        ].map((facility, index) => (
                            <motion.div
                                key={index}
                                variants={fadeInUp}
                                whileHover={{ y: -10 }}
                                className="bg-white rounded-2xl p-6 shadow-lg border border-emerald-100 hover:border-emerald-300 transition-all"
                            >
                                <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center mb-4">
                                    <Building2 className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-xl font-bold mb-2" style={{ color: "#1e293b" }}>
                                    {facility.title}
                                </h3>
                                <p className="text-sm" style={{ color: "#475569" }}>
                                    {facility.description}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section> */}
        </div>
    );
};

export default MPD;