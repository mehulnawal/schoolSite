import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Award, Shield, Star } from 'lucide-react';
import TrustBoardBanner from '../assets/trustee/trusteeBanner.jpeg';

const TrusteesPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    const fadeInUp = {
        hidden: { opacity: 0, y: 60 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
    };

    const leadership = [
        {
            id: 1,
            name: "KUNDA ARIF",
            designation: "PRESIDENT",
            icon: Star,
            image: null // Add image path here when available
        },
        {
            id: 2,
            name: "MOHAMMEDALI ISMAIL GODIL",
            designation: "SECRETARY",
            icon: Award,
            image: null
        },
        {
            id: 3,
            name: "MOHAMMED UMAR MO. SIDDIK HAKEEM",
            designation: "CO-PRESIDENT",
            icon: Users,
            image: null
        }
    ];

    const trustees = [
        {
            id: 4,
            name: "TARIQ ARIF KUNDA",
            designation: "TRUSTEE",
            image: null
        },
        {
            id: 5,
            name: "ILIYAS HAJI IBRAHIM KUNDA",
            designation: "TRUSTEE",
            image: null
        },
        {
            id: 6,
            name: "SHABBIR HAJI SATTAR KUNDA",
            designation: "TRUSTEE",
            image: null
        },
        {
            id: 7,
            name: "MUHAMMAD NAZIR KUNDA",
            designation: "TRUSTEE",
            image: null
        },
        {
            id: 8,
            name: "IRFAN HAJIEBRAHIM KUNDA",
            designation: "TRUSTEE",
            image: null
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
            {/* Hero Banner Section */}
            <div className="relative h-[500px] overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${TrustBoardBanner})` }}
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
                            <Shield className="w-8 h-8 drop-shadow-lg" />
                            <span className="text-xl font-semibold drop-shadow-lg">✨ About Us</span>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-2xl">
                            Board of Trustees
                        </h1>
                        <p className="text-xl md:text-2xl text-white drop-shadow-lg">
                            The visionary leaders guiding our educational mission
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Trust Information Banner */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="max-w-4xl mx-auto -mt-16 relative z-10 px-4"
            >
                <div className="bg-white rounded-2xl shadow-2xl p-8 border-4 border-emerald-500">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-emerald-800 mb-2">
                            MUJADDID ALFESANI EDUCATION TRUST
                        </h2>
                        <div className="inline-block bg-emerald-100 px-6 py-2 rounded-full">
                            <p className="text-emerald-700 font-semibold">
                                Registration No: E-3855/SURAT
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Leadership Section */}
            <div className="max-w-7xl mx-auto px-4 py-20">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-bold text-emerald-800 mb-4">Leadership Team</h2>
                    <p className="text-xl text-gray-600">
                        Guiding our educational vision with wisdom and dedication
                    </p>
                </motion.div>

                {/* Featured Leadership Cards */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                    className="grid md:grid-cols-3 gap-8 mb-20"
                >
                    {leadership.map((leader) => (
                        <motion.div
                            key={leader.id}
                            variants={fadeInUp}
                            whileHover={{ y: -10, transition: { duration: 0.3 } }}
                            className="bg-white rounded-2xl shadow-xl overflow-hidden border-t-4 border-emerald-500"
                        >
                            {/* Image or Icon - Increased height */}
                            {leader.image ? (
                                <div className="h-80 overflow-hidden">
                                    <img
                                        src={leader.image}
                                        alt={leader.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ) : (
                                <div className="h-80 bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
                                    <leader.icon className="w-32 h-32 text-white opacity-50" />
                                </div>
                            )}

                            <div className="p-6 text-center">
                                <h3 className="text-xl font-bold text-gray-800 mb-2">
                                    {leader.name}
                                </h3>
                                <p className="text-emerald-600 font-semibold">{leader.designation}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Board of Trustees Section */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-bold text-emerald-800 mb-4">Board of Trustees</h2>
                    <p className="text-xl text-gray-600">
                        Dedicated members ensuring excellence in education
                    </p>
                </motion.div>

                {/* Trustees List */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {trustees.map((trustee, index) => (
                        <motion.div
                            key={trustee.id}
                            variants={fadeInUp}
                            whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
                        >
                            <div className="flex items-center gap-4 p-6">
                                {/* Number Badge or Image */}
                                {trustee.image ? (
                                    <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                                        <img
                                            src={trustee.image}
                                            alt={trustee.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                ) : (
                                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center flex-shrink-0">
                                        <span className="text-2xl font-bold text-white">
                                            {index + 4}
                                        </span>
                                    </div>
                                )}

                                {/* Trustee Info */}
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-lg font-bold text-gray-800 mb-1 truncate">
                                        {trustee.name}
                                    </h3>
                                    <p className="text-emerald-600 font-medium text-sm">
                                        {trustee.designation}
                                    </p>
                                </div>

                                {/* Decorative Element */}
                                <div className="w-1 h-12 bg-gradient-to-b from-emerald-500 to-emerald-300 rounded-full" />
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default TrusteesPage;