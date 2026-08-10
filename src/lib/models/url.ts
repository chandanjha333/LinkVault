import mongoose, { ObjectId } from 'mongoose';

interface Url extends mongoose.Document {
  shortId: string,
  redirectURL: string,
  customAlias: string,
  userId: ObjectId,
  clickCount: number,
  isActive: boolean,
  expiresAt: Date
}

const URLSchema = new mongoose.Schema<Url> ({
  shortId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  redirectURL: {
    type: String,
    required: true,
  },
  customAlias: {
    type: String,
    unique: true,
    sparse: true,
  },
  userId: {
    type:  mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
    index: true
  },
  clickCount: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  expiresAt: {
    type: Date,
  },
}, { timestamps: true });

export default mongoose.models.Url || mongoose.model<Url>("Url", URLSchema);
