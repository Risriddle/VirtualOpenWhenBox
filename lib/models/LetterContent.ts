import mongoose from "mongoose";

const letterSchema = new mongoose.Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  imageUrls: [{ type: String }],
  boxId: { type: mongoose.Schema.Types.ObjectId, ref: "Box" },
});

export const Letter = mongoose.models.Letter || mongoose.model("Letter", letterSchema);
