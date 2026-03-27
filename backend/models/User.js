import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  githubUsername: { type: String, default: '' },
  profile: {
    skills: { type: [String], default: [] },
    interests: { type: [String], default: [] },
    github: { type: String, default: '' }
  }
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', UserSchema);
