import mongoose from "mongoose";

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    order: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    testTitle: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    video: {
        type: String,
        required: true,
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Courses",
        required: true,
    },
    chapter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chapter",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export const Lecture = mongoose.model("Lecture", schema);
