import mongoose from 'mongoose';

const listingSchema = new mongoose.Schema({
  vehicalModel:{
    type: String,
  },
  agency:{
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
  booked:{
    type: String,
    default: "No",
    enum: ['Yes', 'No'],
  },
  rentUserName:{
    type: String,
  },
  rentUserEmail:{
    type: String,
  },
  rentUserPhone:{
    type: Number,
  },
  userRef:{
    type: String,
  },
}, {timestamps: true});

const Listing = mongoose.model('Listing', listingSchema);

export default Listing; 

