import { errorHandler } from "../utils/error.js";
import User from '../models/user.model.js';
import Listing from '../models/listing.model.js';

export const getUserListings = async (req, res, next) => {
  if (req.user.id === req.params.id) {
    try {
      const listings = await Listing.find({ userRef: req.params.id, booked: "Yes" })
        .populate('userRef', '-password');
      res.status(200).json(listings);
    } catch (error) {
      next(error);
    }
  } else {
    return next(errorHandler(401, "Cannot view other users listings!"));
  }
};

export const getUser = async (req, res, next) => {
  try{
    const user = await User.findById(req.params.id);
    if(!user){
      return next(errorHandler(404, "User not found!"));
    }
    const {password: pass, ...rest} = user._doc;
    res.status(200).json(rest);
  }catch(error){
    next(error);
  }
};