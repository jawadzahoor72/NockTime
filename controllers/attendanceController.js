import { now } from 'mongoose'
import TimeIn from '../models/TimeIn.js'
import date from 'date-and-time';
import moment from 'moment';

class AttendanceController {
    // attendanceRegistration
// static attendanceInRegistration = async (req, res) => {
//     // console.log('req===', req)
//     const { userId, date, timeIn } = req.body

//     if (userId && timeIn && date) {
//         try {
//             const doc = new TimeIn({
//             userId: userId,
//             date: date,
//             timeIn: timeIn
//             })
//             await doc.save()
//             res.status(201).send({ "status": "success", "message": "Attendance In successfully"})

//         } catch (error) {
//             console.log(error)
//             res.send({ "status": "failed", "message": "Unable to add Attendance" })
//         }
//     } else {
//         res.send({ "status": "failed", "message": "All fields are required" })
//     }
// }

    // attendanceouutegistration
// static attendanceOutRegistration = async (req, res) => {
//     const { userId, date, timeOut } = req.body
//     if (userId && timeOut && date) {
        // try {
        //     const doc = new TimeOut({
        //     userId: userId,
        //     timeOut: timeOut,
        //     date: date
        //     })
        //     await doc.save()
        //     res.status(201).send({ "status": "success", "message": "Attendance Out successfully"})

        // } catch (error) {
        //     console.log(error)
        //     res.send({ "status": "failed", "message": "Unable to add Attendance" })
        // }
//     } else {
//         res.send({ "status": "failed", "message": "All fields are required check" })
//     }
// }

    // new model
    static markAttendance = async (req, res) =>{
        const { userId, date,timeIn, timeOut, lat, lng, timeInId, project, activity,activityId,projectId } = req.body
  
        if(req.url === "/markInAttendance"){
            try {
                const doc = new TimeIn({
                userId: req.user._id,
                timeIn: Date.now(),
                lat: lat,
                lng: lng,
                date: Date.now(),
                project:project,
                activity:activity,
                activityId:activityId,
                projectId:projectId,

                })
                await doc.save()
                res.status(201).send({ "status": "success", "message": "Attendance Successfully"})
    
            } catch (error) {
                // console.log(error)
                res.send({ "status": "failed", "message": "Unable to add Attendance" })
            }
        }
        else{
            TimeIn.find({userId:req.user._id, timeOut:null},(err,data)=>{
                if(err)  {
                    // console.log('err ====', err)
                }
                    else {
                        // console.log('data ====', data)
                        if(data[0]){
                            this.timeOutMark(data[0],res)
                        }
                        else{
                            res.send({"status":"success", data:data,})
                        }
                 }
            })
        }

    }
    static timeOutMark = async(data,res)=>{
        const now  =  new Date()
        // console.log('data data====', data)
        const date1 = new Date(data.timeIn);
        const value = date.subtract(now,date1);
        await TimeIn.findByIdAndUpdate(data._id,{
            $set:{
                timeOut: Date.now(),
                totalTime: value.toMilliseconds()
            }
        })
        res.send({"status":"success", "message":"Marked Out"})
    }
    static getTimeInfo = async (req,res)=>{
        let id = req.query.id

        TimeIn.find({activityId:id},(err,data)=>{
            if(err)  {
                // console.log('err ====', err)
            }
                else {
                    // console.log('data ====', data)
                    res.send({"status":"success",total:data.length, data:data})
             }      
        })

        // console.log("res ====", res)
        // console.log("params ====", params)
    }
//    
    static getTimeInfoProject = async (req,res)=>{
        let id = req.query.id

        TimeIn.find({projectId:id},(err,data)=>{
            if(err)  {
                // console.log('err ====', err)
            }
                else {
                    // console.log('data ====', data)
                    res.send({"status":"success",total:data.length, data:data})
             }      
        })

        // console.log("res ====", res)
        // console.log("params ====", params)
    }
   
    static getTimeReport = async (req,res)=>{
        let id = req?.query?.userId || ""
        let queryDate = req?.query?.date || "2022-12-19"
        // console.log("req.query ====",id)
        // let queryDate = '2022-12-19'
        let tod = `${queryDate}T00:00:48.049+00:00`
        let tom = `${queryDate}T00:20:48.049+00:00`
        // console.log('tod ====', tod)
        var today = moment(tod).format('YYYY-MM-DD[T00:00:00.000Z]');
        var d = new Date();
        d.setDate(new Date().getDate() + 1);
        var tomorrow = moment(tom).format('YYYY-MM-DD[T23:39:59.000Z]');
        // console.log('today ====', today)
        // console.log('tomorrow ====', tomorrow)

        TimeIn.find({
            "userId":id,
            "date": {"$gte": new Date(today), "$lt": new Date(tomorrow)}},(err,data)=>{
                if(err)  {
                    // console.log('err ====', err)
                }
                    else {
                        // console.log('data ====', data)
                        res.send({"status":"success",total:data.length, data:data})
                 }      
            })
            
        // {createdAt:{$gte:ISODate(“2020-03-01”),$lt:ISODate(“2021-03-31”)}}
        // TimeIn.find({date:{$gte:new Date("2012-12-19T10:56:59.301Z"),$lt:new Date("2022-18-22T20:56:59.301Z")}},(err,data)=>{
        //             if(err)  {
        //                 console.log('err ====', err)}
        //                 else {
        //                     console.log('data ====', data)
        //                     res.send({"status":"success",total:data.length, data:data})
        //              }      
        //         })

        // TimeIn.find({"date":{
        //     $gte:Date ("2021-01-01"),
        //     $lt:Date ("2020-05-01"),
        // }},(err,data)=>{
        //             if(err)  {
        //                 console.log('err ====', err)}
        //                 else {
        //                     // console.log('data ====', data)
        //                     res.send({"status":"success",total:data.length, data:data})
        //              }      
        //         })



        // console.log("res ====", res)
        // console.log("params ====", params)
    }

}
export default AttendanceController