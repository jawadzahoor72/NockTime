import mongoose from "mongoose";

// Defining Schema
const activity = new mongoose.Schema({
  userId: { type: String, required: true, trim: true},
  causal: { type: Number, required: true, trim: true},
  medical: { type: Number, required: true,trim: true},
  annaul: { type: Number, required: true,trim: true},
  maternity: { type: Number, required: true,trim: true},
  Total: { type: Number, required: true,trim: true},
},{
    timestamps:true,
    
})



// Model
const Activity = mongoose.model("activity", activity)

export default Activity