import mongoose from "mongoose";

// Defining Schema
const timeIn = new mongoose.Schema({
  userId: { type: String, required: true, trim: true},
  date: { type: Date, required: false, trim: true},
  timeIn: { type: Date, required: true,default: Date.now},
  timeOut: { type: Date, required: false},
  lat: { type: String, required: true},
  lng: { type: String, required: true},
  totalTime: {type:Number, required:false},
  activity: {type:Object, required:false},
  activityId: {type:Object, required:false},
  project: {type:Object, required:false},
  projectId: {type:Object, required:false}
})



// Model
const TimeIn = mongoose.model("timeIn", timeIn)

export default TimeIn