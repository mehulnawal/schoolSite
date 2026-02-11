import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const upload = multer({ storage: multer.memoryStorage() });

/* ---------------- CLOUDINARY CONFIG ---------------- */
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

/* ---------------- FIREBASE ADMIN INIT ---------------- */
admin.initializeApp({
    credential: admin.credential.cert(
        JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
    ),
    databaseURL: process.env.FIREBASE_DB_URL,
});

const db = admin.database();

/* ---------------- SAVE DASHBOARD ROUTE ---------------- */
app.post("/api/admin/dashboard", upload.single("bannerImage"), async (req, res) => {
    try {
        let bannerImageUrl = null;

        // 1️⃣ Upload to Cloudinary if new image
        if (req.file) {
            const uploadResult = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream(
                    {
                        folder: "school/banner",
                        resource_type: "image",
                        transformation: [
                            { width: 1920, crop: "limit" },
                            { quality: "auto" },
                            { fetch_format: "auto" }
                        ]
                    },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                ).end(req.file.buffer);
            });

            bannerImageUrl = uploadResult.secure_url;
        }

        // 2️⃣ Save to Firebase
        const dashboardRef = db.ref("dashboard");

        const existingData = (await dashboardRef.get()).val();

        await dashboardRef.set({
            bannerImageUrl: bannerImageUrl || existingData?.bannerImageUrl || null,
            admissionOpen: req.body.admissionOpen === "true",
            downloadFormEnabled: req.body.downloadFormEnabled === "true",
            updatedAt: Date.now(),
        });

        res.json({ success: true });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
});

app.get("/api/admin/dashboard", async (req, res) => {
    try {
        const snapshot = await db.ref("dashboard").get();
        res.json(snapshot.val() || {});
    } catch (err) {
        res.status(500).json({ message: "Error fetching data" });
    }
});

app.listen(5000, () => console.log("Server running on port 5000"));
