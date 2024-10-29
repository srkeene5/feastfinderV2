import mongoose from 'mongoose';

const appLoginSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  username: { type: String, required: true },
  email: { type: String, required: true },
  passwordHash: { type: String, required: true }, // Store hashed password
  logins: {
    type: [String],
    required: true,
  },
});

const AppLogin = mongoose.model('AppLogin', appLoginSchema);

export default AppLogin;
