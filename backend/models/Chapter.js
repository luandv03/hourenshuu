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
});

export const Chapter = mongoose.model("Chapter", schema);
