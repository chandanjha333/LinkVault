import mongoose from "mongoose";

interface User extends mongoose.Document {
  name: string,
  email: string,
  password: string,
  urls: Number,
  provider: string,
}

const UserSchema = new mongoose.Schema<User> ({
  name: {
    type: String,
    required: true,
    maxlength: 40
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
  },
  urls: {
    type: Number,
    default: 0,
  },
  provider: {
    type: String,
    default: "credentials",
  },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model<User>("User", UserSchema);