import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        titleTest: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Chapter = mongoose.model("Chapter", schema);
