import mongoose from "mongoose";

const boxSchema = new mongoose.Schema({
  boxfor: { type: String, required: true },
  letters: [{ type: mongoose.Schema.Types.ObjectId, ref: "Letter" }],
},{timestamps:true});

export const Box = mongoose.models.Box || mongoose.model("Box", boxSchema);
