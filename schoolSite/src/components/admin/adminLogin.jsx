import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useSelector, useDispatch } from 'react-redux';
import { Lock, Mail, Eye, EyeOff, Sun, Moon, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { app } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { toggleTheme } from '../../redux/themeSlice';

export default function AdminLogin() {

    const mode = useSelector((state) => state.theme.mode);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = getAuth(app);

    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});

    // Apply dark mode globally
    useEffect(() => {
        document.documentElement.classList.toggle("dark", mode === "dark");
    }, [mode]);

    const validate = () => {
        let newErrors = {};
        if (!formData.email) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";

        if (!formData.password) newErrors.password = "Password is required";
        else if (formData.password.length < 6) newErrors.password = "Must be at least 6 characters";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validate()) {
            toast.error("Please fix the errors");
            return;
        }

        signInWithEmailAndPassword(auth, formData.email, formData.password)
            .then(() => {
                toast.success("Access Granted", {
                    style: {
                        background: mode === "dark" ? "#1e293b" : "#ffffff",
                        color: mode === "dark" ? "#ffffff" : "#1e293b",
                    },
                });

                localStorage.setItem("adminToken", "some-token");
                navigate("/admin/panel");
            })
            .catch((error) => {
                toast.error(error.message);
            });
    };

    return (
        <div className="relative flex items-center justify-center min-h-screen p-4 transition-colors duration-500
            bg-slate-50
            dark:bg-gradient-to-br
            dark:from-slate-900
            dark:via-slate-800
            dark:to-slate-900">

            {/* Decorative Background Pattern - Light Mode */}
            <div className="absolute inset-0 opacity-5 dark:opacity-0">
                <div style={{
                    backgroundImage: `radial-gradient(#059669 1px, transparent 1px)`,
                    backgroundSize: '30px 30px',
                    width: '100%',
                    height: '100%'
                }}></div>
            </div>

            {/* Decorative Blobs - Light Mode */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl dark:opacity-0"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-300/20 rounded-full blur-3xl dark:opacity-0"></div>

            {/* Theme Toggle */}
            <button
                onClick={() => dispatch(toggleTheme())}
                className="absolute top-6 right-6 p-3 rounded-full
                bg-white dark:bg-slate-800
                text-slate-700 dark:text-emerald-400
                shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300
                border border-slate-200 dark:border-slate-700"
            >
                {mode === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md relative z-10"
            >
                <div className="bg-white dark:bg-slate-900/95
                    rounded-3xl shadow-2xl 
                    border border-slate-200 dark:border-slate-700
                    overflow-hidden transition-all duration-500">

                    {/* Header */}
                    <div className="bg-gradient-to-r from-emerald-600 to-emerald-500
                        dark:from-emerald-700 dark:to-emerald-600
                        px-8 py-10 text-center">

                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring" }}
                            className="w-20 h-20 bg-white rounded-2xl
                            flex items-center justify-center mx-auto mb-4 shadow-lg">
                            <Lock className="w-10 h-10 text-emerald-600" />
                        </motion.div>

                        <h1 className="text-3xl font-bold text-white">
                            Admin Panel
                        </h1>
                        <p className="text-emerald-100 mt-2">
                            Mujaddid Alsefani School
                        </p>
                    </div>

                    {/* Form */}
                    <div className="px-8 py-10">
                        <form onSubmit={handleSubmit} className="space-y-6">

                            {/* Email */}
                            <div>
                                <label className="block mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                                    Email Address
                                </label>

                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-slate-500" />

                                    <input
                                        type="email"
                                        placeholder="admin@school.com"
                                        onChange={(e) =>
                                            setFormData({ ...formData, email: e.target.value })
                                        }
                                        className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl outline-none
                                        bg-slate-50 dark:bg-slate-800
                                        text-slate-800 dark:text-white
                                        placeholder:text-slate-400
                                        transition-all duration-300
                                        ${errors.email
                                                ? "border-red-500 ring-2 ring-red-200"
                                                : "border-slate-200 dark:border-slate-600 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 dark:focus:ring-emerald-400/20"
                                            }`}
                                    />
                                </div>

                                {errors.email && (
                                    <p className="mt-2 text-xs text-red-500 flex items-center gap-1">
                                        <AlertCircle size={12} /> {errors.email}
                                    </p>
                                )}
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                                    Password
                                </label>

                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-slate-500" />

                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        onChange={(e) =>
                                            setFormData({ ...formData, password: e.target.value })
                                        }
                                        className={`w-full pl-12 pr-12 py-3 border-2 rounded-xl outline-none
                                        bg-slate-50 dark:bg-slate-800
                                        text-slate-800 dark:text-white
                                        placeholder:text-slate-400
                                        transition-all duration-300
                                        ${errors.password
                                                ? "border-red-500 ring-2 ring-red-200"
                                                : "border-slate-200 dark:border-slate-600 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 dark:focus:ring-emerald-400/20"
                                            }`}
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>

                                {errors.password && (
                                    <p className="mt-2 text-xs text-red-500 flex items-center gap-1">
                                        <AlertCircle size={12} /> {errors.password}
                                    </p>
                                )}
                            </div>

                            {/* Submit */}
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700
                                dark:from-emerald-700 dark:to-emerald-600
                                text-white py-3 px-6 rounded-xl font-bold text-lg
                                shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                                Sign In to Dashboard
                            </motion.button>

                        </form>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}