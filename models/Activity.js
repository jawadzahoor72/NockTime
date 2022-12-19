import mongoose from "mongoose";

// Defining Schema
const activity = new mongoose.Schema({
  userId: { type: String, required: true, trim: true},
  name: { type: String, required: true, trim: true},
  code: { type: String, required: true},
  desc: { type: String, required: false},
  color: { type: String, required: true},
},{
    timestamps:true,
    
})



// Model
const Activity = mongoose.model("activity", activity)

export default Activity