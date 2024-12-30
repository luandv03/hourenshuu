import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        order: {
            type: Number,
            required: true,
        },
        chapter: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Chapter",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Test = mongoose.model("Test", schema);
