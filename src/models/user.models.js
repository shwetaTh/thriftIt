import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  itemsForSale: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item'
  }]
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);
