import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        answerRecording: {
            type: String,
        },
        answerText: {
            type: String,
        },
        practice_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Practice",
            required: true,
        },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        result: {
            type: String,
        },
        point: {
            type: Number,
        },
    },
    {
        timestamps: true,
    }
);

export const PracticeUser = mongoose.model("PracticeUser", schema);
