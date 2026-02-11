import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Newspaper, ChevronRight } from 'lucide-react';
import { getDatabase, ref, onValue } from 'firebase/database';
import { app } from './firebase';
import envetsNewsBg from '../assets/envets-news/envets-news-bg.jpg'

const NewsAndEventsPage = () => {
    const [activeTab, setActiveTab] = useState('news'); // 'news' or 'events'

    // News state
    const [currentNews, setCurrentNews] = useState([]);
    const [pastNews, setPastNews] = useState([]);
    const [loadingNews, setLoadingNews] = useState(true);

    // Events state
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [pastEvents, setPastEvents] = useState([]);
    const [loadingEvents, setLoadingEvents] = useState(true);

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
                staggerChildren: 0.15
            }
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    useEffect(() => {
        const db = getDatabase(app);

        // Real-time listener for News
        const newsRef = ref(db, 'news/newsList');
        const unsubscribeNews = onValue(newsRef, (snapshot) => {
            if (snapshot.exists()) {
                const allNews = Object.values(snapshot.val());

                // Sort by date (newest first for display)
                allNews.sort((a, b) => new Date(b.date) - new Date(a.date));

                // Split into current/future and past
                const today = new Date().toISOString().split('T')[0];

                const current = allNews.filter(n => n.date >= today);
                const past = allNews.filter(n => n.date < today);

                setCurrentNews(current);
                setPastNews(past);
            } else {
                setCurrentNews([]);
                setPastNews([]);
            }
            setLoadingNews(false);
        }, (error) => {
            console.error('Error fetching news:', error);
            setLoadingNews(false);
        });

        // Real-time listener for Events
        const eventsRef = ref(db, 'events/eventsList');
        const unsubscribeEvents = onValue(eventsRef, (snapshot) => {
            if (snapshot.exists()) {
                const allEvents = Object.values(snapshot.val());

                // Sort by date (oldest first for upcoming, newest first for past)
                allEvents.sort((a, b) => new Date(a.date) - new Date(b.date));

                // Split into upcoming and past
                const today = new Date().toISOString().split('T')[0];

                const upcoming = allEvents.filter(e => e.date >= today);
                const past = allEvents.filter(e => e.date < today).reverse();

                setUpcomingEvents(upcoming);
                setPastEvents(past);
            } else {
                setUpcomingEvents([]);
                setPastEvents([]);
            }
            setLoadingEvents(false);
        }, (error) => {
            console.error('Error fetching events:', error);
            setLoadingEvents(false);
        });

        // Cleanup listeners on unmount
        return () => {
            unsubscribeNews();
            unsubscribeEvents();
        };
    }, []);

    const NewsCard = ({ news, isPast }) => (
        <motion.div
            variants={fadeInUp}
            whileHover={{ y: -10, scale: 1.02 }}
            className={`bg-white rounded-2xl overflow-hidden shadow-xl border border-emerald-100 hover:shadow-2xl transition-all ${isPast ? 'opacity-90' : ''
                }`}
        >
            {/* Image */}
            <div className="relative h-56 bg-slate-200 overflow-hidden">
                <img
                    src={news.imageUrl}
                    alt={news.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-emerald-600 text-white px-4 py-1.5 rounded-full text-sm font-bold uppercase shadow-lg">
                    News
                </div>
                {isPast && (
                    <div className="absolute top-4 right-4 bg-slate-800/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold">
                        PAST
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                    <Calendar className="w-4 h-4 text-emerald-600" />
                    <span className="text-sm font-semibold text-emerald-600">
                        {news.dateDisplay}
                    </span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-800 line-clamp-2">
                    {news.title}
                </h3>
                <p className="text-slate-600 leading-relaxed line-clamp-3">
                    {news.description}
                </p>
            </div>
        </motion.div>
    );

    const EventCard = ({ event, isPast }) => (
        <motion.div
            variants={fadeInUp}
            whileHover={{ y: -10, scale: 1.02 }}
            className={`bg-white rounded-2xl overflow-hidden shadow-xl border border-emerald-100 hover:shadow-2xl transition-all ${isPast ? 'opacity-90' : ''
                }`}
        >
            {/* Image */}
            <div className="relative h-56 bg-slate-200 overflow-hidden">
                <img
                    src={event.imageUrl}
                    alt={event.title}
                    className="w-full h-full object-cover"
                />
                <div className={`absolute bottom-4 left-4 ${isPast ? 'bg-slate-600' : 'bg-emerald-600'
                    } text-white px-4 py-2 rounded-lg font-bold text-sm shadow-lg`}>
                    {event.dateDisplay}
                </div>
                {isPast && (
                    <div className="absolute top-4 right-4 bg-slate-800/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold">
                        PAST
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                    <Calendar className={`w-4 h-4 ${isPast ? 'text-slate-500' : 'text-emerald-600'}`} />
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                        School Event
                    </span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-800 line-clamp-2">
                    {event.title}
                </h3>
                <p className="text-slate-600 leading-relaxed line-clamp-3">
                    {event.description}
                </p>
            </div>
        </motion.div>
    );

    return (
        <div className="bg-slate-50 overflow-hidden">
            {/* Hero Banner Section */}
            <section className="relative min-h-[60vh] flex items-center overflow-hidden">
                <div className="absolute inset-0 w-full h-full">
                    <img
                        src={envetsNewsBg}
                        alt="News & Events"
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
                            ✨ Stay Updated
                        </motion.div>

                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 drop-shadow-2xl">
                            <span className="bg-gradient-to-r from-emerald-400 via-amber-400 to-emerald-300 bg-clip-text text-transparent">
                                News & Events
                            </span>
                        </h1>

                        <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 leading-relaxed drop-shadow-lg">
                            Stay informed about the latest happenings at our school
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Tabs Section */}
            <section className="py-12 bg-white border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="flex justify-center gap-4"
                    >
                        <button
                            onClick={() => setActiveTab('news')}
                            className={`px-8 py-4 rounded-xl font-bold text-lg transition-all ${activeTab === 'news'
                                ? 'bg-emerald-600 text-white shadow-xl'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                }`}
                        >
                            <Newspaper className="w-5 h-5 inline-block mr-2" />
                            News
                        </button>
                        <button
                            onClick={() => setActiveTab('events')}
                            className={`px-8 py-4 rounded-xl font-bold text-lg transition-all ${activeTab === 'events'
                                ? 'bg-emerald-600 text-white shadow-xl'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                }`}
                        >
                            <Calendar className="w-5 h-5 inline-block mr-2" />
                            Events
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* Content Section */}
            <AnimatePresence mode="wait">
                {activeTab === 'news' && (
                    <motion.div
                        key="news"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Current/Future News */}
                        <section className="py-16 bg-gradient-to-br from-slate-50 to-emerald-50">
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                <motion.div
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    variants={fadeInUp}
                                    className="mb-12"
                                >
                                    <h2 className="text-4xl font-bold text-slate-800 mb-3">
                                        Latest News
                                    </h2>
                                    <div className="flex items-center gap-2">
                                        <div className="h-1 w-20 bg-emerald-600 rounded-full"></div>
                                        <p className="text-lg text-slate-600">
                                            {currentNews.length} {currentNews.length === 1 ? 'article' : 'articles'}
                                        </p>
                                    </div>
                                </motion.div>

                                {loadingNews ? (
                                    <div className="text-center py-16">
                                        <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                                        <p className="mt-4 text-slate-600">Loading news...</p>
                                    </div>
                                ) : currentNews.length > 0 ? (
                                    <motion.div
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true }}
                                        variants={staggerContainer}
                                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                                    >
                                        {currentNews.map((news) => (
                                            <NewsCard key={news.id} news={news} isPast={false} />
                                        ))}
                                    </motion.div>
                                ) : (
                                    <div className="text-center py-16 bg-white rounded-2xl">
                                        <Newspaper className="w-16 h-16 mx-auto mb-4 text-slate-400" />
                                        <p className="text-xl font-semibold text-slate-600">
                                            No current news available
                                        </p>
                                    </div>
                                )}
                            </div>
                        </section>

                        {/* Past News */}
                        {pastNews.length > 0 && (
                            <section className="py-16 bg-white">
                                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                    <motion.div
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true }}
                                        variants={fadeInUp}
                                        className="mb-12"
                                    >
                                        <h2 className="text-4xl font-bold text-slate-800 mb-3">
                                            Past News
                                        </h2>
                                        <div className="flex items-center gap-2">
                                            <div className="h-1 w-20 bg-slate-400 rounded-full"></div>
                                            <p className="text-lg text-slate-600">
                                                {pastNews.length} {pastNews.length === 1 ? 'article' : 'articles'}
                                            </p>
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true }}
                                        variants={staggerContainer}
                                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                                    >
                                        {pastNews.map((news) => (
                                            <NewsCard key={news.id} news={news} isPast={true} />
                                        ))}
                                    </motion.div>
                                </div>
                            </section>
                        )}
                    </motion.div>
                )}

                {activeTab === 'events' && (
                    <motion.div
                        key="events"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Upcoming Events */}
                        <section className="py-16 bg-gradient-to-br from-slate-50 to-emerald-50">
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                <motion.div
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    variants={fadeInUp}
                                    className="mb-12"
                                >
                                    <h2 className="text-4xl font-bold text-slate-800 mb-3">
                                        Upcoming Events
                                    </h2>
                                    <div className="flex items-center gap-2">
                                        <div className="h-1 w-20 bg-emerald-600 rounded-full"></div>
                                        <p className="text-lg text-slate-600">
                                            {upcomingEvents.length} {upcomingEvents.length === 1 ? 'event' : 'events'}
                                        </p>
                                    </div>
                                </motion.div>

                                {loadingEvents ? (
                                    <div className="text-center py-16">
                                        <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                                        <p className="mt-4 text-slate-600">Loading events...</p>
                                    </div>
                                ) : upcomingEvents.length > 0 ? (
                                    <motion.div
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true }}
                                        variants={staggerContainer}
                                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                                    >
                                        {upcomingEvents.map((event) => (
                                            <EventCard key={event.id} event={event} isPast={false} />
                                        ))}
                                    </motion.div>
                                ) : (
                                    <div className="text-center py-16 bg-white rounded-2xl">
                                        <Calendar className="w-16 h-16 mx-auto mb-4 text-slate-400" />
                                        <p className="text-xl font-semibold text-slate-600">
                                            No upcoming events scheduled
                                        </p>
                                    </div>
                                )}
                            </div>
                        </section>

                        {/* Past Events */}
                        {pastEvents.length > 0 && (
                            <section className="py-16 bg-white">
                                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                    <motion.div
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true }}
                                        variants={fadeInUp}
                                        className="mb-12"
                                    >
                                        <h2 className="text-4xl font-bold text-slate-800 mb-3">
                                            Past Events
                                        </h2>
                                        <div className="flex items-center gap-2">
                                            <div className="h-1 w-20 bg-slate-400 rounded-full"></div>
                                            <p className="text-lg text-slate-600">
                                                {pastEvents.length} {pastEvents.length === 1 ? 'event' : 'events'}
                                            </p>
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true }}
                                        variants={staggerContainer}
                                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                                    >
                                        {pastEvents.map((event) => (
                                            <EventCard key={event.id} event={event} isPast={true} />
                                        ))}
                                    </motion.div>
                                </div>
                            </section>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* CTA Section */}
            <section className="py-24 relative overflow-hidden" style={{ background: `linear-gradient(135deg, #059669 0%, #064e3b 100%)` }}>
                <div className="absolute inset-0 opacity-10"
                    style={{ backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`, backgroundSize: '30px 30px' }}>
                </div>

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Want to Learn More?
                        </h2>
                        <p className="text-xl text-emerald-50 mb-10 opacity-90 leading-relaxed">
                            Explore our programs and discover how we nurture excellence
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                            <motion.button
                                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-white text-emerald-800 px-10 py-4 rounded-full font-bold text-lg shadow-2xl hover:bg-emerald-50 transition-all flex items-center"
                            >
                                Admissions
                                <ChevronRight className="ml-2 w-5 h-5" />
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="border-2 border-white/40 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-all backdrop-blur-sm"
                            >
                                Contact Us
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default NewsAndEventsPage;