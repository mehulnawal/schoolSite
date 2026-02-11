import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Upload, Image as ImageIcon, Save, AlertCircle, CheckCircle, X } from "lucide-react";
import { getDatabase, ref, get, update } from "firebase/database";
import { app } from "../firebase";

const CLOUD_NAME = "dpslolrdf";
const UPLOAD_PRESET = "banner_image";

const Dashboard = ({ theme }) => {
    const [bannerImage, setBannerImage] = useState(null);
    const [bannerPreview, setBannerPreview] = useState("");
    const [admissionOpen, setAdmissionOpen] = useState(false);
    const [downloadFormEnabled, setDownloadFormEnabled] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [notification, setNotification] = useState({ show: false, type: "", message: "" });

    const fileInputRef = useRef(null);
    const isDark = theme === "dark";

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const db = getDatabase(app);
            const snapshot = await get(ref(db, "dashboard"));

            if (snapshot.exists()) {
                const data = snapshot.val();
                setBannerPreview(data.bannerImageUrl || "");
                setAdmissionOpen(data.admissionOpen || false);
                setDownloadFormEnabled(data.downloadFormEnabled || false);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleBannerChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setBannerImage(file);

        const reader = new FileReader();
        reader.onload = () => setBannerPreview(reader.result);
        reader.readAsDataURL(file);
    };

    const removeBannerImage = () => {
        setBannerImage(null);
        setBannerPreview("");
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleSave = async () => {
        setIsSaving(true);

        try {
            let bannerImageUrl = bannerPreview;

            // 1️⃣ Upload to Cloudinary if new image selected
            if (bannerImage) {
                const formData = new FormData();
                formData.append("file", bannerImage);
                formData.append("upload_preset", UPLOAD_PRESET);

                const response = await fetch(
                    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
                    {
                        method: "POST",
                        body: formData,
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    console.log("Cloudinary error:", data);
                    throw new Error(data.error?.message || "Cloudinary upload failed");
                }

                bannerImageUrl = data.secure_url.replace(
                    "/upload/",
                    "/upload/q_auto,f_auto,w_1920/"
                );
            }

            // 2️⃣ Save to Firebase
            const db = getDatabase(app);
            const dashboardRef = ref(db, "dashboard");

            const updates = {
                updatedAt: Date.now(),
            };

            // Only update banner if changed
            if (bannerImage) {
                updates.bannerImageUrl = bannerImageUrl;
            }

            // Always update toggles
            updates.admissionOpen = admissionOpen;
            updates.downloadFormEnabled = downloadFormEnabled;

            await update(dashboardRef, updates);

            showNotification("success", "Settings saved successfully!");
            setBannerImage(null);

        } catch (error) {
            console.error(error);
            showNotification("error", "Something went wrong.");
        } finally {
            setIsSaving(false);
        }
    };

    const showNotification = (type, message) => {
        setNotification({ show: true, type, message });
        setTimeout(() => {
            setNotification({ show: false, type: "", message: "" });
        }, 3000);
    };

    return (
        <div className={`min-h-screen p-4 lg:p-8 ${isDark ? "bg-slate-900" : "bg-slate-50"}`}>
            <div className="max-w-6xl mx-auto space-y-6">
                {/* Header */}
                <div className="mb-8">
                    <h1 className={`text-4xl font-bold mb-2 ${isDark ? "text-white" : "text-slate-800"}`}>
                        Dashboard
                    </h1>
                    <p className={`text-lg ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                        Manage homepage banner and settings
                    </p>
                </div>

                {/* Notification */}
                {notification.show && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className={`rounded-xl p-4 flex items-center gap-3 shadow-lg ${notification.type === "success"
                            ? "bg-emerald-50 border border-emerald-200"
                            : "bg-red-50 border border-red-200"
                            }`}
                    >
                        {notification.type === "success" ? (
                            <CheckCircle className="w-6 h-6 text-emerald-600" />
                        ) : (
                            <AlertCircle className="w-6 h-6 text-red-600" />
                        )}
                        <p className={`flex-1 font-medium ${notification.type === "success" ? "text-emerald-800" : "text-red-800"
                            }`}>
                            {notification.message}
                        </p>
                    </motion.div>
                )}

                {/* Banner Image Upload Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`rounded-2xl p-6 shadow-xl ${isDark ? "bg-slate-800" : "bg-white"
                        }`}
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center">
                            <ImageIcon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h2 className={`text-2xl font-bold ${isDark ? "text-white" : "text-slate-800"}`}>
                                Homepage Banner Image
                            </h2>
                            <p className={`text-sm ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                                Upload or change the main banner image (Preview shows exact frontend view)
                            </p>
                        </div>
                    </div>

                    {/* Banner Preview - EXACT FRONTEND REPLICA */}
                    {bannerPreview ? (
                        <div className="mb-6 relative rounded-xl overflow-hidden" style={{ minHeight: '60vh' }}>

                            <div className="absolute inset-0 w-full h-full">
                                <img
                                    src={bannerPreview}
                                    alt="Banner Preview"
                                    className="w-full h-full object-cover object-center"
                                />
                                {/* Same gradients as frontend */}
                                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/60"></div>
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40"></div>
                            </div>

                            {/* Preview Label */}
                            {/* <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-md text-white border border-white/30 px-4 py-2 rounded-full text-sm font-medium z-10">
                                ✨ Frontend Preview
                            </div> */}

                            {/* Remove Button */}
                            <button
                                onClick={removeBannerImage}
                                className="absolute top-4 right-4 w-10 h-10 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center shadow-lg transition-colors z-10"
                            >
                                <X className="w-5 h-5 text-white" />
                            </button>

                            {/* Sample Content Overlay - Shows how text will look */}
                            {/* <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                                <div className="text-center max-w-3xl px-4">
                                    <div className="inline-block bg-white/20 backdrop-blur-md text-white border border-white/30 px-4 py-2 rounded-full text-sm font-medium mb-6">
                                        ✨ Admissions Open for 2026-27
                                    </div>
                                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 drop-shadow-2xl text-white">
                                        Fostering
                                        <br />
                                        <span className="bg-gradient-to-r from-emerald-400 via-amber-400 to-emerald-300 bg-clip-text text-transparent">
                                            Future Leaders
                                        </span>
                                    </h1>
                                    <p className="text-lg sm:text-xl text-white/90 leading-relaxed drop-shadow-lg">
                                        The newest approach in Theology, with the deepest roots
                                    </p>
                                </div>
                            </div> */}
                        </div>
                    ) : (
                        <div className={`mb-6 border-2 border-dashed rounded-xl p-12 text-center ${isDark ? "border-slate-700 bg-slate-900/50" : "border-slate-300 bg-slate-50"
                            }`} style={{ minHeight: '40vh' }}>
                            <ImageIcon className={`w-16 h-16 mx-auto mb-4 ${isDark ? "text-slate-600" : "text-slate-400"}`} />
                            <p className={`text-lg ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                                No banner image selected
                            </p>
                            <p className={`text-sm mt-2 ${isDark ? "text-slate-500" : "text-slate-500"}`}>
                                Upload an image to see the frontend preview
                            </p>
                        </div>
                    )}

                    {/* Hidden File Input */}
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleBannerChange}
                        className="hidden"
                    />

                    {/* Upload Button */}
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-3 px-6 rounded-xl font-semibold text-center shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                    >
                        <Upload className="w-5 h-5" />
                        Upload New Banner
                    </motion.button>
                </motion.div>

                {/* Toggle Buttons Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className={`rounded-2xl p-6 shadow-xl ${isDark ? "bg-slate-800" : "bg-white"
                        }`}
                >
                    <h2 className={`text-2xl font-bold mb-6 ${isDark ? "text-white" : "text-slate-800"}`}>
                        Settings
                    </h2>

                    <div className="space-y-4">
                        {/* Admission Open/Close Toggle */}
                        <div className={`p-4 rounded-xl border-2 ${admissionOpen
                            ? "border-emerald-300 bg-emerald-50/50"
                            : isDark ? "border-slate-700 bg-slate-900/50" : "border-slate-200 bg-slate-50"
                            }`}>
                            <div className="flex items-center justify-between">
                                <div className="flex-1">
                                    <h3 className={`text-lg font-bold mb-1 ${isDark ? "text-white" : "text-slate-800"
                                        }`}>
                                        Admission Status
                                    </h3>
                                    <p className={`text-sm ${isDark ? "text-slate-400" : "text-slate-600"
                                        }`}>
                                        Display "Admissions Open" banner on homepage
                                    </p>
                                </div>
                                <button
                                    onClick={() => setAdmissionOpen(!admissionOpen)}
                                    className={`relative w-16 h-8 rounded-full transition-colors ${admissionOpen ? "bg-emerald-600" : isDark ? "bg-slate-700" : "bg-slate-300"
                                        }`}
                                >
                                    <motion.div
                                        layout
                                        className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-md"
                                        style={{
                                            left: admissionOpen ? "36px" : "4px"
                                        }}
                                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                    />
                                </button>
                            </div>
                            <div className="mt-3">
                                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${admissionOpen
                                    ? "bg-emerald-600 text-white"
                                    : isDark ? "bg-slate-700 text-slate-300" : "bg-slate-200 text-slate-700"
                                    }`}>
                                    {admissionOpen ? "OPEN" : "CLOSED"}
                                </span>
                            </div>
                        </div>

                        {/* Download Form Toggle */}
                        <div className={`p-4 rounded-xl border-2 ${downloadFormEnabled
                            ? "border-emerald-300 bg-emerald-50/50"
                            : isDark ? "border-slate-700 bg-slate-900/50" : "border-slate-200 bg-slate-50"
                            }`}>
                            <div className="flex items-center justify-between">
                                <div className="flex-1">
                                    <h3 className={`text-lg font-bold mb-1 ${isDark ? "text-white" : "text-slate-800"
                                        }`}>
                                        Downloadable Admission Form
                                    </h3>
                                    <p className={`text-sm ${isDark ? "text-slate-400" : "text-slate-600"
                                        }`}>
                                        Enable download button on Admissions page
                                    </p>
                                </div>
                                <button
                                    onClick={() => setDownloadFormEnabled(!downloadFormEnabled)}
                                    className={`relative w-16 h-8 rounded-full transition-colors ${downloadFormEnabled ? "bg-emerald-600" : isDark ? "bg-slate-700" : "bg-slate-300"
                                        }`}
                                >
                                    <motion.div
                                        layout
                                        className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-md"
                                        style={{
                                            left: downloadFormEnabled ? "36px" : "4px"
                                        }}
                                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                    />
                                </button>
                            </div>
                            <div className="mt-3">
                                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${downloadFormEnabled
                                    ? "bg-emerald-600 text-white"
                                    : isDark ? "bg-slate-700 text-slate-300" : "bg-slate-200 text-slate-700"
                                    }`}>
                                    {downloadFormEnabled ? "ENABLED" : "DISABLED"}
                                </span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Save Button */}
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSave}
                    disabled={isSaving}
                    className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-4 px-6 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
                            Save All Changes
                        </>
                    )}
                </motion.button>
            </div>
        </div>
    );
};

export default Dashboard;