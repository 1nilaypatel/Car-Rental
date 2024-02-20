import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username:{
    type: String,
    unique: true,
  },
  email:{
    type: String,
    unique: true,
  },
  phone:{
    type: Number,
    unique: true,
  },
  password:{
    type: String,
  },
  customerType:{
    type: String,
    enum: ['User', 'Agency'],
  }
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

export default User;