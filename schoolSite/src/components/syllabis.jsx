import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, GraduationCap, Award, Globe } from 'lucide-react';
import SyllabusBanner from '../assets/syllaus/SyllabusBanner.jpeg';

const SyllabusPage = () => {
    const [selectedMedium, setSelectedMedium] = useState('english');
    const [selectedGrade, setSelectedGrade] = useState('1-2');

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

    const syllabusData = {
        english: {
            '1-2': {
                subjects: [
                    { subject: 'Language-1', details: 'ELGA (English)' },
                    { subject: 'Mathematics', details: '' },
                    { subject: 'Environment', details: '' },
                    { subject: 'Language-2', details: 'Gujarati' },
                    { subject: 'Computer', details: 'CCS' },
                    { subject: 'Moral Science', details: '' },
                    { subject: 'Judo', details: '' },
                    { subject: 'P.T.', details: '' },
                    { subject: 'Library', details: '' },
                    { subject: 'M.D.', details: '' },
                    { subject: 'Drawing', details: '' },
                ],
                description: `We have selected Lead Curriculum in standards 1 to 5, with the view to enhance conceptual learning in the children. We go with the latest technology in the field of education as an aid to provide a holistic development to the children. The classes are all equipped with smart boards and have maximum available practical working models to explain the subjects optimally.
                
                Being a GSEB affiliated school, we go in accordance with the state government prescribed books from standard 6 onwards. Our emphasis is on the conceptual and all round development of the child. The child's understanding is promoted through multiple activities and projects. Teaching is activity based and in synch with the smart boards available in each class`
            },

            '3-5': {
                subjects: [
                    { subject: 'Language-1', details: 'ELGA (English)' },
                    { subject: 'Mathematics', details: '' },
                    { subject: 'Environment', details: '' },
                    { subject: 'Language-2', details: 'Gujarati' },
                    { subject: 'Language-3', details: 'Hindi' },
                    { subject: 'Computer', details: 'CCS' },
                    { subject: 'Moral Science', details: '' },
                    { subject: 'Judo', details: '' },
                    { subject: 'P.T.', details: '' },
                    { subject: 'Library', details: '' },
                    { subject: 'M.D.', details: '' },
                    { subject: 'Drawing', details: '' },
                ],
                description: `We have selected Lead Curriculum in standards 1 to 5, with the view to enhance conceptual learning in the children. We go with the latest technology in the field of education as an aid to provide a holistic development to the children. The classes are all equipped with smart boards and have maximum available practical working models to explain the subjects optimally.

                Being a GSEB affiliated school, we go in accordance with the state government prescribed books from standard 6 onwards. Our emphasis is on the conceptual and all round development of the child. The child's understanding is promoted through multiple activities and projects. Teaching is activity based and in synch with the smart boards available in each class`
            },

            '6-10': {
                subjects: [
                    { subject: 'Language-1', details: 'ELGA (English)' },
                    { subject: 'Language-2', details: 'Gujarati' },
                    { subject: 'Language-3', details: 'Hindi' },
                    { subject: 'Language-4', details: 'Arabic' },
                    { subject: 'Mathematics', details: '' },
                    { subject: 'Science', details: '' },
                    { subject: 'Social Science', details: '' },
                    { subject: 'G.K.', details: '' },
                    { subject: 'Computer', details: '' },
                    { subject: 'Drawing', details: '' },
                    { subject: 'Moral Science', details: '' },
                    { subject: 'P.T.', details: '' },
                    { subject: 'Library', details: '' },
                    { subject: 'M.D.', details: '' },
                    { subject: 'Life Skills', details: '' },
                    { subject: 'Stem Lab', details: '' },
                ],
                description: `We have selected Lead Curriculum in standards 1 to 5, with the view to enhance conceptual learning in the children. We go with the latest technology in the field of education as an aid to provide a holistic development to the children. The classes are all equipped with smart boards and have maximum available practical working models to explain the subjects optimally.

                Being a GSEB affiliated school, we go in accordance with the state government prescribed books from standard 6 onwards. Our emphasis is on the conceptual and all round development of the child. The child's understanding is promoted through multiple activities and projects. Teaching is activity based and in synch with the smart boards available in each class`
            },

            '11-12': {
                subjects: [
                    { subject: 'Accountancy', details: '' },
                    { subject: 'Statistics', details: '' },
                    { subject: 'Economics', details: '' },
                    { subject: 'Organization of commerce', details: '' },
                    { subject: 'Language-1', details: 'ELGA (English)' },
                    { subject: 'Language-2', details: 'Gujarati' },
                    { subject: 'Computer', details: 'CCS' },
                    { subject: 'Moral Science', details: '' },
                    { subject: 'P.T.', details: '' },
                    { subject: 'M.D.', details: '' },
                    { subject: 'Life Skills', details: '' },
                    { subject: 'Judo', details: '' },
                ],
                description: `We have selected Lead Curriculum in standards 1 to 5, with the view to enhance conceptual learning in the children. We go with the latest technology in the field of education as an aid to provide a holistic development to the children. The classes are all equipped with smart boards and have maximum available practical working models to explain the subjects optimally.

                Being a GSEB affiliated school, we go in accordance with the state government prescribed books from standard 6 onwards. Our emphasis is on the conceptual and all round development of the child. The child's understanding is promoted through multiple activities and projects. Teaching is activity based and in synch with the smart boards available in each class`
            }
        },

        gujarati: {
            '1-2': {
                subjects: [
                    { subject: 'Language-1', details: 'Gujarati' },
                    { subject: 'Language-2', details: 'English' },
                    { subject: 'Maths', details: '' },
                    { subject: 'G.K.', details: '' },
                    { subject: 'Computer', details: '' },
                    { subject: 'Drawing', details: '' },
                    { subject: 'P.T.', details: '' },
                    { subject: 'Islamiyat', details: '' },
                    { subject: 'Life Skills', details: '' },
                    { subject: 'Library', details: '' },
                    { subject: 'Judo/Karate', details: '' },
                ],
                description: `We have selected Lead Curriculum in standards 1 to 5, with the view to enhance conceptual learning in the children. We go with the latest technology in the field of education as an aid to provide a holistic development to the children. The classes are all equipped with smart boards and have maximum available practical working models to explain the subjects optimally.
                
                Being a GSEB affiliated school, we go in accordance with the state government prescribed books from standard 6 onwards. Our emphasis is on the conceptual and all round development of the child. The child's understanding is promoted through multiple activities and projects. Teaching is activity based and in synch with the smart boards available in each class`
            },

            '3-5': {
                subjects: [
                    { subject: 'Language-1', details: 'Gujarati' },
                    { subject: 'Language-2', details: 'English' },
                    { subject: 'Maths', details: '' },
                    { subject: 'Env', details: '' },
                    { subject: 'G.K.', details: '' },
                    { subject: 'Computer', details: '' },
                    { subject: 'Drawing', details: '' },
                    { subject: 'P.T.', details: '' },
                    { subject: 'Islamiyat', details: '' },
                    { subject: 'Life Skills', details: '' },
                    { subject: 'Library', details: '' },
                    { subject: 'Judo/Karate', details: '' },
                ],
                description: `We have selected Lead Curriculum in standards 1 to 5, with the view to enhance conceptual learning in the children. We go with the latest technology in the field of education as an aid to provide a holistic development to the children. The classes are all equipped with smart boards and have maximum available practical working models to explain the subjects optimally.
                
                Being a GSEB affiliated school, we go in accordance with the state government prescribed books from standard 6 onwards. Our emphasis is on the conceptual and all round development of the child. The child's understanding is promoted through multiple activities and projects. Teaching is activity based and in synch with the smart boards available in each class`
            },

            '6-10': {
                subjects: [
                    { subject: 'Language-1', details: 'Gujarati' },
                    { subject: 'Language-2', details: 'English' },
                    { subject: 'Language-3', details: 'Hindi' },
                    { subject: 'Language-4', details: 'Arabic' },
                    { subject: 'Maths', details: '' },
                    { subject: 'Science', details: '' },
                    { subject: 'Social Study', details: '' },
                    { subject: 'G.K.', details: '' },
                    { subject: 'Computer', details: '' },
                    { subject: 'Drawing', details: '' },
                    { subject: 'Islamiyat', details: '' },
                    { subject: 'P.T.', details: '' },
                    { subject: 'Life Skills', details: '' },
                    { subject: 'Library', details: '' },
                    { subject: 'Judo/Karate', details: '' },
                ],
                description: `We have selected Lead Curriculum in standards 1 to 5, with the view to enhance conceptual learning in the children. We go with the latest technology in the field of education as an aid to provide a holistic development to the children. The classes are all equipped with smart boards and have maximum available practical working models to explain the subjects optimally.

                Being a GSEB affiliated school, we go in accordance with the state government prescribed books from standard 6 onwards. Our emphasis is on the conceptual and all round development of the child. The child's understanding is promoted through multiple activities and projects. Teaching is activity based and in synch with the smart boards available in each class`
            },

            '11-12': {
                subjects: [
                    { subject: 'Accountancy', details: '' },
                    { subject: 'Statistics', details: '' },
                    { subject: 'Economics', details: '' },
                    { subject: 'Organization of commerce', details: '' },
                    { subject: 'Language-1', details: 'Gujarati' },
                    { subject: 'Language-2', details: 'English' },
                    { subject: 'Computer', details: 'CCS' },
                    { subject: 'Moral Science', details: '' },
                    { subject: 'P.T.', details: '' },
                    { subject: 'Islamiyat', details: '' },
                    { subject: 'Life Skills', details: '' },
                    { subject: 'Library', details: '' },
                ],
                description: `We have selected Lead Curriculum in standards 1 to 5, with the view to enhance conceptual learning in the children. We go with the latest technology in the field of education as an aid to provide a holistic development to the children. The classes are all equipped with smart boards and have maximum available practical working models to explain the subjects optimally.

                Being a GSEB affiliated school, we go in accordance with the state government prescribed books from standard 6 onwards. Our emphasis is on the conceptual and all round development of the child. The child's understanding is promoted through multiple activities and projects. Teaching is activity based and in synch with the smart boards available in each class`
            }
        }
    };

    const currentSyllabus = syllabusData[selectedMedium][selectedGrade];

    return (
        <div className="bg-slate-50 overflow-hidden">

            {/* Hero Banner Section */}
            <section className="relative min-h-[60vh] flex items-center overflow-hidden">
                <div className="absolute inset-0 w-full h-full">
                    <img
                        src={SyllabusBanner}
                        alt="Syllabus"
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
                            ✨ Academics
                        </motion.div>

                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 drop-shadow-2xl">
                            <span className="bg-gradient-to-r from-emerald-400 via-amber-400 to-emerald-300 bg-clip-text text-transparent">
                                Syllabus
                            </span>
                        </h1>

                        <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 leading-relaxed drop-shadow-lg">
                            Comprehensive curriculum designed for holistic development
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Main Content Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Medium Selection Tabs */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="mb-8"
                    >
                        <div className="flex gap-4 justify-start border-b border-slate-200">
                            <button
                                onClick={() => setSelectedMedium('english')}
                                className={`px-6 py-3 font-bold text-lg uppercase tracking-wider transition-all ${selectedMedium === 'english'
                                    ? 'text-emerald-600 border-b-4 border-emerald-600'
                                    : 'text-slate-400 hover:text-slate-600'
                                    }`}
                            >
                                English
                            </button>
                            <button
                                onClick={() => setSelectedMedium('gujarati')}
                                className={`px-6 py-3 font-bold text-lg uppercase tracking-wider transition-all ${selectedMedium === 'gujarati'
                                    ? 'text-emerald-600 border-b-4 border-emerald-600'
                                    : 'text-slate-400 hover:text-slate-600'
                                    }`}
                            >
                                Gujarati
                            </button>
                        </div>
                    </motion.div>

                    {/* Grade Selection Tabs */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="mb-12"
                    >
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            <button
                                onClick={() => setSelectedGrade('1-2')}
                                className={`px-6 py-3 rounded-lg font-semibold text-sm transition-all ${selectedGrade === '1-2'
                                    ? 'bg-slate-800 text-white shadow-xl'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                    }`}
                            >
                                Std 1st and 2nd
                            </button>
                            <button
                                onClick={() => setSelectedGrade('3-5')}
                                className={`px-6 py-3 rounded-lg font-semibold text-sm transition-all ${selectedGrade === '3-5'
                                    ? 'bg-slate-800 text-white shadow-xl'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                    }`}
                            >
                                Std 3rd to 5th
                            </button>
                            <button
                                onClick={() => setSelectedGrade('6-10')}
                                className={`px-6 py-3 rounded-lg font-semibold text-sm transition-all ${selectedGrade === '6-10'
                                    ? 'bg-slate-800 text-white shadow-xl'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                    }`}
                            >
                                Std 6th to 10th
                            </button>
                            <button
                                onClick={() => setSelectedGrade('11-12')}
                                className={`px-6 py-3 rounded-lg font-semibold text-sm transition-all ${selectedGrade === '11-12'
                                    ? 'bg-slate-800 text-white shadow-xl'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                    }`}
                            >
                                Std 11th and 12th
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
                        {/* Left Column - Subjects Table */}
                        <motion.div variants={fadeInUp} className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <tbody>
                                        {currentSyllabus.subjects.map((item, index) => (
                                            <motion.tr
                                                key={index}
                                                variants={fadeInUp}
                                                className="border-b border-slate-200 hover:bg-emerald-50/50 transition-colors"
                                            >
                                                <td className="px-6 py-4 font-semibold text-slate-800 border-r border-slate-200">
                                                    {item.subject}
                                                </td>
                                                <td className="px-6 py-4 text-slate-600">
                                                    {item.details}
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </motion.div>

                        {/* Right Column - Description */}
                        <motion.div variants={fadeInUp}>
                            <div className="bg-gradient-to-br from-emerald-50 to-white rounded-2xl p-8 shadow-lg border border-emerald-100 h-full">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center">
                                        <BookOpen className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-1">
                                            Syllabus
                                        </p>
                                        <h3 className="text-2xl font-bold" style={{ color: "#1e293b" }}>
                                            ENGLISH MEDIUM
                                        </h3>
                                    </div>
                                </div>

                                <div className="space-y-4 text-lg leading-relaxed" style={{ color: "#475569" }}>
                                    {currentSyllabus.description.split('\n\n').map((paragraph, index) => (
                                        <p key={index}>{paragraph}</p>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default SyllabusPage;