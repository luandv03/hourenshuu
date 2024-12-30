import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// ☁️ Cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 📦 Multer Cloudinary storage for audio
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "recordings",
        resource_type: "video", // Audio files are treated as video
    },
});

const upload = multer({ storage });

// 📤 Upload route
router.post("/upload", upload.single("audio"), async (req, res) => {
    try {
        const { path, public_id } = req.file;
        res.status(200).json({ url: path, public_id });
    } catch (error) {
        res.status(500).json({ message: "Failed to upload audio", error });
    }
});

export default router;
