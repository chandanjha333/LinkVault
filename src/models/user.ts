import mongoose from "mongoose";

interface User extends mongoose.Document {
  name: string,
  email: string,
  password: string,
  urls: Number,
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
  },
  password: {
    type: String,
    required: true,
  },
  urls: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model<User>("User", UserSchema);