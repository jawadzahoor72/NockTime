import Project from '../models/Project.js'

class ProjectController {

static addProject = async (req, res) => {
    const { name, code,color, desc } = req.body
    if (name && code && color ) {
        try {
            const doc = new Project({
            userId: req.user._id,
            name: name,
            code: code,
            desc: desc,
            color: color
            })
            await doc.save()
            res.status(201).send({ "status": "success", "message": "Project Created successfully"})

        } catch (error) {
            // console.log(error)
            res.send({ "status": "failed", "message": "Unable to Crete Project" })
        }
    } else {
        res.send({ "status": "failed", "message": "Fields are required" })
    }
}

// Edit Project
static editProject = async (req, res)=>{
    const { name, code, color, desc } = req.body
            await Project.findByIdAndUpdate(req.body._id,{
            $set:{
                name: name,
                code: code,
                desc: desc,
                color: color
            }
        })
        res.send({"status":"success", "message":"Project Updated"})
}

// delete Project
static deleteProject = async (req, res)=>{
    const {_id } = req.body
        await Project.findByIdAndDelete(req.body._id)
        res.send({"status":"success", "message":"Project Deleted"})
}

// get projects
static getprojects = async (req, res)=>{
    Project.find({userId:req.user._id},(err,data)=>{
        if(err)  {
            // console.log('err ====', err)
        }
            else {
                res.send({"status":"success",total:data.length, data:data,})
                // console.log('data ====', data)
         }      
    })

    }

}
export default ProjectController