import mongoose, { ObjectId } from "mongoose";

interface Click extends mongoose.Document {
  urlId: ObjectId,
  timestamp: Date,
  referrer: String,
  userAgent: String,
  device: String,
  browser: String,
  country: String,
  ipHash: String,
}

const ClickSchema = new mongoose.Schema<Click> ({
  urlId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Url",
    required: true,
    index: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  referrer: { type: String },
  userAgent: { type: String },
  device: { type: String },
  browser: { type: String },
  country: { type: String },
  ipHash: { type: String },
});

export default mongoose.models.Click || mongoose.model<Click>("Click", ClickSchema);