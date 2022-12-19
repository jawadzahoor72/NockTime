import mongoose from "mongoose";

const connectDB = async (DATABASE_URL) => {
    try{
        const DB_OPTION = {
            dbName:"TimeTracking"
        }
        await mongoose.connect(DATABASE_URL,DB_OPTION)
        // console.log("connected succesfully") //removed it from prod mode
    } catch(error){
        // console.log('db error ===', error)
    }

}
export default connectDB