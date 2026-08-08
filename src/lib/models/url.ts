import mongoose, { ObjectId } from 'mongoose';

interface Url extends mongoose.Document {
  shortId: string,
  redirectURL: string,
  visitHistory: Date[],
  createdBy: ObjectId
}

const URLSchema = new mongoose.Schema<Url> ({
  shortId: {
    type: String,
    required: true,
    unique: true,
  },
  redirectURL: {
    type: String,
    required: true,
  },
  visitHistory: [{ timrStamps: { type: Number } }],
  createdBy: {
    type:  mongoose.Schema.Types.ObjectId,
    ref: "users",
  }
}, { timestamps: true });

export default mongoose.models.Url || mongoose.model<Url>("Url", URLSchema);
