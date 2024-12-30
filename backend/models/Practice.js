import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        video: {
            type: String,
            required: true,
        },
        course_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Courses",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Practice = mongoose.model("Practice", schema);
