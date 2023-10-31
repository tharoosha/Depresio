import mongoose from "mongoose";

const MonthlyEmotionSchema = new mongoose.Schema({
    month: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    joyful: {
      type: Number,
      required: true,
    },
    surprise: {
      type: Number,
      required: true,
    },
    anger: {
      type: Number,
      required: true,
    },
    sad: {
      type: Number,
      required: true,
    },
    happy: {
      type: Number,
      required: true,
    },
  });

export const UserSchema  = new mongoose.Schema({
    username : {
        type: String,
        required : [true, "Please provide unique Username"],
        unique: [true, "Username Exist"]
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        unique : false,
    },
    email: {
        type: String,
        required : [true, "Please provide a unique email"],
        unique: true,
    },
    firstName: { type: String},
    lastName: { type: String},
    mobile : { type : Number},
    address: { type: String},
    profile: { type: String},
    recommendation: { type: String},
    logs: [MonthlyEmotionSchema],
});

export default mongoose.model.Users || mongoose.model('User', UserSchema );