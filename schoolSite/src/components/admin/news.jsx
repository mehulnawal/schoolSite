import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit, Trash2, Image as ImageIcon, X, Save, Calendar, Settings, AlertCircle, CheckCircle } from 'lucide-react';
import { getDatabase, ref, get, set, update, remove } from 'firebase/database';
import { app } from '../firebase';

const CLOUD_NAME = "dpslolrdf";
const UPLOAD_PRESET = "events_news_image";

const NewsManagement = ({ theme }) => {
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [pastEvents, setPastEvents] = useState([]);
    const [maxEvents, setMaxEvents] = useState(7);
    const [allowDeletingPastEvents, setAllowDeletingPastEvents] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [editingEvent, setEditingEvent] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        date: '', // YYYY-MM-DD format
        dateDisplay: '', // Display format like "Jan 26"
        image: null,
        description: '',
    });
    const [imagePreview, setImagePreview] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [notification, setNotification] = useState({ show: false, type: '', message: '' });

    const fileInputRef = useRef(null);
    const isDark = theme === 'dark';

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const db = getDatabase(app);

            // Fetch settings
            const settingsSnap = await get(ref(db, 'news/settings'));
            if (settingsSnap.exists()) {
                const settings = settingsSnap.val();
                setMaxEvents(settings.maxEvents || 7);
                setAllowDeletingPastEvents(settings.allowDeletingPastEvents || false);
            }

            // Fetch all events
            const newsSnap = await get(ref(db, 'news/newsList'));

            if (newsSnap.exists()) {
                const allNews = Object.values(newsSnap.val());

                // Sort by date (oldest first)
                allNews.sort((a, b) => new Date(a.date) - new Date(b.date));

                // Split into upcoming and past
                const today = new Date().toISOString().split('T')[0];

                const upcoming = allNews.filter(e => e.date >= today);
                const past = allNews.filter(e => e.date < today).reverse();

                setUpcomingEvents(upcoming);
                setPastEvents(past);
            } else {
                setUpcomingEvents([]);
                setPastEvents([]);
            }
        } catch (error) {
            console.error('Error fetching events:', error);
            showNotification('error', 'Failed to fetch events');
        }
    };

    const getTotalEvents = () => {
        return upcomingEvents.length + pastEvents.length;
    };

    const canAddEvent = () => {
        return getTotalEvents() < maxEvents;
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setFormData({ ...formData, image: file });

        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const removeImage = () => {
        setImagePreview('');
        setFormData({ ...formData, image: null });
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const openModal = (event = null) => {
        if (event) {
            setEditingEvent(event);
            setFormData({
                title: event.title,
                description: event.description,
                date: event.date,
                dateDisplay: event.dateDisplay,
                image: null
            });
            setImagePreview(event.imageUrl);
        } else {
            // Check if can add new event
            if (!canAddEvent()) {
                showNotification('error', `Event limit reached (${maxEvents}/${maxEvents}). Delete an event to add new one.`);
                return;
            }

            setEditingEvent(null);
            setFormData({
                title: '',
                description: '',
                date: '',
                dateDisplay: '',
                image: null
            });
            setImagePreview('');
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingEvent(null);
        setFormData({ title: '', date: '', dateDisplay: '', image: null });
        setImagePreview('');
    };

    const formatDateDisplay = (dateString) => {
        // Convert YYYY-MM-DD to "Jan 26" format
        const date = new Date(dateString + 'T00:00:00');
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return `${months[date.getMonth()]} ${date.getDate()}`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);

        try {
            let imageUrl = imagePreview;

            // Upload image to Cloudinary if new image selected
            if (formData.image) {
                const formDataUpload = new FormData();
                formDataUpload.append('file', formData.image);
                formDataUpload.append('upload_preset', UPLOAD_PRESET);

                const response = await fetch(
                    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
                    {
                        method: 'POST',
                        body: formDataUpload,
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error?.message || 'Image upload failed');
                }

                imageUrl = data.secure_url.replace(
                    '/upload/',
                    '/upload/q_auto,f_auto,w_800/'
                );
            }

            const db = getDatabase(app);

            if (editingEvent) {
                // Update existing event
                const updates = {
                    title: formData.title,
                    description: formData.description,
                    date: formData.date,
                    dateDisplay: formatDateDisplay(formData.date),
                    imageUrl: imageUrl,
                    updatedAt: Date.now()
                };

                await update(ref(db, `news/newsList/${editingEvent.id}`), updates);
                showNotification('success', 'News updated successfully!');
            } else {
                // Create new event
                const eventId = `news_${Date.now()}`;
                const newEvent = {
                    id: eventId,
                    title: formData.title,
                    description: formData.description,
                    date: formData.date,
                    dateDisplay: formatDateDisplay(formData.date),
                    imageUrl: imageUrl,
                    createdAt: Date.now(),
                    updatedAt: Date.now()
                };

                await set(ref(db, `news/newsList/${eventId}`), newEvent);
                showNotification('success', 'News added successfully!');
            }

            fetchEvents();
            closeModal();

        } catch (error) {
            console.error('Error saving event:', error);
            showNotification('error', 'Failed to save event');
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (eventId, isPastEvent) => {

        // Check if deleting past event and if it's allowed
        if (isPastEvent && !allowDeletingPastEvents) {
            showNotification('error', 'Deleting past events is disabled. Enable it in settings.');
            return;
        }

        if (!confirm('Are you sure you want to delete this event?')) return;

        try {
            const db = getDatabase(app);
            await remove(ref(db, `news/newsList/${eventId}`));

            showNotification('success', 'Event deleted successfully!');
            fetchEvents();
        } catch (error) {
            console.error('Error deleting event:', error);
            showNotification('error', 'Failed to delete event');
        }
    };

    const handleSettingsSave = async () => {
        try {
            const db = getDatabase(app);
            await update(ref(db, 'events/settings'), {
                allowDeletingPastEvents: allowDeletingPastEvents
            });

            showNotification('success', 'Settings saved successfully!');
            setIsSettingsOpen(false);
        } catch (error) {
            console.error('Error saving settings:', error);
            showNotification('error', 'Failed to save settings');
        }
    };

    const showNotification = (type, message) => {
        setNotification({ show: true, type, message });
        setTimeout(() => {
            setNotification({ show: false, type: '', message: '' });
        }, 4000);
    };

    const EventCard = ({ event, isPastEvent }) => (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className={`rounded-2xl overflow-hidden shadow-xl ${isDark ? 'bg-slate-800' : 'bg-white'
                } ${isPastEvent ? 'opacity-75' : ''}`}
        >
            {/* Image */}
            <div className="relative h-48 bg-slate-200">
                <img
                    src={event.imageUrl}
                    alt={event.title}
                    className="w-full h-full object-cover"
                />
                <div className={`absolute bottom-4 left-4 ${isPastEvent ? 'bg-slate-600' : 'bg-emerald-600'
                    } text-white px-4 py-1.5 rounded-lg font-bold text-sm shadow-lg`}>
                    {event.dateDisplay}
                </div>
                {isPastEvent && (
                    <div className="absolute top-4 right-4 bg-slate-800/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold">
                        PAST
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-6">
                <div className="flex items-center mb-3">
                    <Calendar className={`w-4 h-4 ${isPastEvent ? 'text-slate-500' : 'text-emerald-600'} mr-2`} />
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                        School News
                    </span>
                </div>
                <h3 className={`text-xl font-bold mb-2 line-clamp-2 ${isDark ? 'text-white' : 'text-slate-800'
                    }`}>
                    {event.title}
                </h3>
                <p className={`text-sm line-clamp-3 mb-4 ${isDark ? 'text-slate-400' : 'text-slate-600'
                    }`}>
                    {event.description}
                </p>

                {/* Actions */}
                <div className="flex gap-2">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => openModal(event)}
                        className="flex-1 bg-emerald-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-emerald-700 transition-colors"
                    >
                        <Edit className="w-4 h-4" />
                        Edit
                    </motion.button>

                    {/* Show delete button conditionally */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleDelete(event.id, isPastEvent)}
                        className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-red-700 transition-colors"
                    >
                        <Trash2 className="w-4 h-4" />
                        Delete
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );

    return (
        <div className={`min-h-screen p-4 lg:p-8 ${isDark ? 'bg-slate-900' : 'bg-slate-50'}`}>
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <div>
                        <h1 className={`text-4xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-800'}`}>
                            News Management
                        </h1>
                        <p className={`text-lg ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                            Manage school news ({getTotalEvents()}/{maxEvents} news)
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsSettingsOpen(true)}
                            className="bg-slate-600 text-white px-4 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                        >
                            <Settings className="w-5 h-5" />
                            Settings
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: canAddEvent() ? 1.05 : 1 }}
                            whileTap={{ scale: canAddEvent() ? 0.95 : 1 }}
                            onClick={() => openModal()}
                            disabled={!canAddEvent()}
                            className={`px-6 py-3 rounded-xl font-semibold shadow-lg transition-all flex items-center gap-2 ${canAddEvent()
                                ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white hover:shadow-xl'
                                : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                                }`}
                        >
                            <Plus className="w-5 h-5" />
                            Add News
                        </motion.button>
                    </div>
                </div>

                {/* Notification */}
                {notification.show && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className={`rounded-xl p-4 flex items-center gap-3 shadow-lg mb-6 ${notification.type === 'success'
                            ? 'bg-emerald-50 border border-emerald-200'
                            : 'bg-red-50 border border-red-200'
                            }`}
                    >
                        {notification.type === 'success' ? (
                            <CheckCircle className="w-6 h-6 text-emerald-600" />
                        ) : (
                            <AlertCircle className="w-6 h-6 text-red-600" />
                        )}
                        <p className={`flex-1 font-medium ${notification.type === 'success' ? 'text-emerald-800' : 'text-red-800'
                            }`}>
                            {notification.message}
                        </p>
                    </motion.div>
                )}

                {/* Upcoming Events Section */}
                <div className="mb-12">
                    <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-slate-800'}`}>
                        Upcoming News ({upcomingEvents.length})
                    </h2>

                    {upcomingEvents.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <AnimatePresence>
                                {upcomingEvents.map((event) => (
                                    <EventCard key={event.id} event={event} isPastEvent={false} />
                                ))}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <div className={`text-center py-12 rounded-2xl ${isDark ? 'bg-slate-800' : 'bg-white'}`}>
                            <Calendar className={`w-12 h-12 mx-auto mb-3 ${isDark ? 'text-slate-600' : 'text-slate-400'}`} />
                            <p className={`text-lg font-semibold ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                                No upcoming news
                            </p>
                        </div>
                    )}
                </div>

                {/* Past Events Section */}
                <div>
                    <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-slate-800'}`}>
                        Past News ({pastEvents.length})
                    </h2>

                    {pastEvents.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <AnimatePresence>
                                {pastEvents.map((event) => (
                                    <EventCard key={event.id} event={event} isPastEvent={true} />
                                ))}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <div className={`text-center py-12 rounded-2xl ${isDark ? 'bg-slate-800' : 'bg-white'}`}>
                            <Calendar className={`w-12 h-12 mx-auto mb-3 ${isDark ? 'text-slate-600' : 'text-slate-400'}`} />
                            <p className={`text-lg font-semibold ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                                No past news
                            </p>
                        </div>
                    )}
                </div>

                {/* Settings Modal */}
                <AnimatePresence>
                    {isSettingsOpen && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsSettingsOpen(false)}
                                className="fixed inset-0 bg-black/50 z-40"
                            />

                            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className={`w-full max-w-md rounded-2xl shadow-2xl ${isDark ? 'bg-slate-800' : 'bg-white'
                                        }`}
                                >
                                    <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                                        <div className="flex items-center justify-between">
                                            <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>
                                                News Settings
                                            </h2>
                                            <button
                                                onClick={() => setIsSettingsOpen(false)}
                                                className="w-10 h-10 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center justify-center"
                                            >
                                                <X className={isDark ? 'text-slate-400' : 'text-slate-600'} />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="p-6 space-y-6">
                                        {/* Max Events Info */}
                                        <div className={`p-4 rounded-xl ${isDark ? 'bg-slate-900' : 'bg-slate-50'}`}>
                                            <h3 className={`text-sm font-semibold mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                                                Maximum News
                                            </h3>
                                            <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>
                                                {maxEvents} News
                                            </p>
                                            <p className={`text-xs mt-1 ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                                                Total upcoming + past news combined
                                            </p>
                                        </div>

                                        {/* Allow Deleting Past Events Toggle */}
                                        {/* <div className={`p-4 rounded-xl border-2 ${allowDeletingPastEvents
                                            ? 'border-emerald-300 bg-emerald-50/50'
                                            : isDark ? 'border-slate-700 bg-slate-900/50' : 'border-slate-200 bg-slate-50'
                                            }`}>
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex-1">
                                                    <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>
                                                        Allow Deleting Past Events
                                                    </h3>
                                                    <p className={`text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                                                        Enable delete button for past events
                                                    </p>
                                                </div>
                                                <button
                                                    onClick={() => setAllowDeletingPastEvents(!allowDeletingPastEvents)}
                                                    className={`relative w-16 h-8 rounded-full transition-colors ${allowDeletingPastEvents ? 'bg-emerald-600' : isDark ? 'bg-slate-700' : 'bg-slate-300'
                                                        }`}
                                                >
                                                    <motion.div
                                                        layout
                                                        className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-md"
                                                        style={{
                                                            left: allowDeletingPastEvents ? '36px' : '4px'
                                                        }}
                                                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                                    />
                                                </button>
                                            </div>
                                            <div className="mt-3">
                                                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${allowDeletingPastEvents
                                                    ? 'bg-emerald-600 text-white'
                                                    : isDark ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'
                                                    }`}>
                                                    {allowDeletingPastEvents ? 'ENABLED' : 'DISABLED'}
                                                </span>
                                            </div>
                                        </div> */}

                                        {/* Save Button */}
                                        {/* <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={handleSettingsSave}
                                            className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-3 px-6 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                                        >
                                            <Save className="w-5 h-5" />
                                            Save Settings
                                        </motion.button> */}
                                    </div>
                                </motion.div>
                            </div>
                        </>
                    )}
                </AnimatePresence>

                {/* Add/Edit Event Modal */}
                <AnimatePresence>
                    {isModalOpen && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={closeModal}
                                className="fixed inset-0 bg-black/50 z-40"
                            />

                            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className={`w-full max-w-2xl rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto ${isDark ? 'bg-slate-800' : 'bg-white'
                                        }`}
                                >
                                    {/* Modal Header */}
                                    <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
                                        <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>
                                            {editingEvent ? 'Edit News' : 'Add News'}
                                        </h2>
                                        <button
                                            onClick={closeModal}
                                            className="w-10 h-10 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center justify-center transition-colors"
                                        >
                                            <X className={isDark ? 'text-slate-400' : 'text-slate-600'} />
                                        </button>
                                    </div>

                                    {/* Modal Body */}
                                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                                        {/* Image Upload */}
                                        <div>
                                            <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'
                                                }`}>
                                                News Image
                                            </label>
                                            {imagePreview ? (
                                                <div className="relative">
                                                    <img
                                                        src={imagePreview}
                                                        alt="Preview"
                                                        className="w-full h-48 object-cover rounded-xl"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={removeImage}
                                                        className="absolute top-2 right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                                                    >
                                                        <X className="w-4 h-4 text-white" />
                                                    </button>
                                                </div>
                                            ) : (
                                                <label className={`block border-2 border-dashed rounded-xl p-8 text-center cursor-pointer hover:border-emerald-500 transition-colors ${isDark ? 'border-slate-700 bg-slate-900/50' : 'border-slate-300 bg-slate-50'
                                                    }`}>
                                                    <input
                                                        ref={fileInputRef}
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={handleImageChange}
                                                        className="hidden"
                                                        required={!editingEvent}
                                                    />
                                                    <ImageIcon className={`w-12 h-12 mx-auto mb-2 ${isDark ? 'text-slate-600' : 'text-slate-400'
                                                        }`} />
                                                    <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                                                        Click to upload news image
                                                    </p>
                                                </label>
                                            )}
                                        </div>

                                        {/* Title */}
                                        <div>
                                            <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'
                                                }`}>
                                                News Title
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.title}
                                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                                required
                                                className={`w-full px-4 py-3 border-2 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors ${isDark
                                                    ? 'bg-slate-900 border-slate-700 text-white'
                                                    : 'bg-white border-slate-200 text-slate-800'
                                                    }`}
                                                placeholder="Enter news title"
                                            />
                                        </div>

                                        {/* Date */}
                                        <div>
                                            <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'
                                                }`}>
                                                News Date
                                            </label>
                                            <input
                                                type="date"
                                                value={formData.date}
                                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                                required
                                                className={`w-full px-4 py-3 border-2 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors ${isDark
                                                    ? 'bg-slate-900 border-slate-700 text-white'
                                                    : 'bg-white border-slate-200 text-slate-800'
                                                    }`}
                                            />
                                            <p className={`text-xs mt-1 ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                                                News automatically move to "Past News" after this date
                                            </p>
                                        </div>

                                        {/* Description */}
                                        <div>
                                            <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'
                                                }`}>
                                                News Description
                                            </label>
                                            <textarea
                                                value={formData.description}
                                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                                required
                                                rows="4"
                                                className={`w-full px-4 py-3 border-2 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors resize-none ${isDark
                                                    ? 'bg-slate-900 border-slate-700 text-white'
                                                    : 'bg-white border-slate-200 text-slate-800'
                                                    }`}
                                                placeholder="Enter event description"
                                            />
                                        </div>

                                        {/* Submit Button */}
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            type="submit"
                                            disabled={isSaving}
                                            className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                        >
                                            {isSaving ? (
                                                <>
                                                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Saving...
                                                </>
                                            ) : (
                                                <>
                                                    <Save className="w-5 h-5" />
                                                    {editingEvent ? 'Update News' : 'Add News'}
                                                </>
                                            )}
                                        </motion.button>
                                    </form>
                                </motion.div>
                            </div>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default NewsManagement;