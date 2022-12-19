import Activity from '../models/Activity.js'

class ActivityController {

static addActivity = async (req, res) => {
    const { userId, name, code,color, desc } = req.body
    if (name && code && userId && color ) {
        try {
            const doc = new Activity({
            userId: userId,
            name: name,
            code: code,
            desc: desc,
            color: color
            })
            await doc.save()
            res.status(201).send({ "status": "success", "message": "Activity Created successfully"})

        } catch (error) {
            // console.log(error)
            res.send({ "status": "failed", "message": "Unable to Crete Activity" })
        }
    } else {
        res.send({ "status": "failed", "message": "Fields are required" })
    }
}

// Edit Activity
static editActivity = async (req, res)=>{
    const { userId, name, code, color, desc } = req.body
            await Activity.findByIdAndUpdate(req.body._id,{
            $set:{
                name: name,
                code: code,
                desc: desc,
                color: color
            }
        })
        res.send({"status":"success", "message":"Activity Updated"})
}

// delete Activity
static deleteActivity = async (req, res)=>{
    const {_id } = req.body
        await Activity.findByIdAndDelete(req.body._id)
        res.send({"status":"success", "message":"Activity Deleted"})
}

}
export default ActivityController