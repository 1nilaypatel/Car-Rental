import mongoose from 'mongoose';

const agencySchema = new mongoose.Schema({
  vehicalModel:{
    type: String,
  },
  vehicalNumber:{
    type: String,
  },
  seatingCapacity:{
    type: Number,
  },
  rentPerDay:{
    type: Number,
  },
  numberOfDaysNeed:{
    type: Number,
  },
  capturedStartDate: {
    type: Date,
  },
  vehicleImg:{
    type: String,
    default: "https://drive.google.com/file/d/1PZh85O285OKBL-njimuOXf50REtCqbT-/view?usp=sharing",
  },
  userRef:{
    type: String,
  },
}, {timestamps: true});

const Agency = mongoose.model('Agency', agencySchema);

export default Agency; 

