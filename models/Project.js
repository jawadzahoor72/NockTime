import mongoose from "mongoose";

// Defining Schema
const project = new mongoose.Schema({
  userId: { type: String, required: true, trim: true},
  name: { type: String, required: true, trim: true},
  code: { type: String, required: true},
  desc: { type: String, required: false},
  color: { type: String, required: true},
},{
    timestamps:true,
    
})



// Model
const Project = mongoose.model("project", project)

export default Project