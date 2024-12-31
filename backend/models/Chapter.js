import mongoose from "mongoose";

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    testTitle: {
        type: String,
        required: true,
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
    },
    order: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
    },
});

export const Chapter = mongoose.model("Chapter", schema);
