import mongoose from "mongoose";

// Defining Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: false, trim: true },
  fullName: { type: String, required: false },
  image: { type: String, required: false, trim: true },
  email: { type: String, required: false, trim: true },
  password: { type: String, required: true, trim: true },
  phoneNumber: { type: String, required: true },
  role: { type: String, required: false },
  groupName: { type: String, required: false },
  faceData: { type: String, required: false },
  timeIn: {type: String, required:false},
  timeOut: {type: String, required:false},
  status: {type: String, required:false},
  organization: {type: String, required:true},
  userType: {type: Number, required:true, trim:true},
  remainings: {type: Number, required:false},
  total: {type: Number, required:false}

},
{
  timestamps: true
})

// Model
const UserModel = mongoose.model("user", userSchema)

export default UserModel