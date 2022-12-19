    import UserModel from '../models/User.js'
    import bcrypt from 'bcrypt'
    import jwt from 'jsonwebtoken'
    import transporter from '../config/emailConfig.js'
    import mongoose from "mongoose";


    const DATABASE_URL = process.env.DATABASE_URL

    class UserController {
    static userRegistration = async (req, res) => {
        const { name, email, password, password_confirmation,phoneNumber,organization,userType } = req.body
        const user = await UserModel.findOne({ email: email })
        if (user) {
        res.send({ "status": "failed", "message": "Email already exists" })
        } else {
        if (name && email && password && password_confirmation && phoneNumber && organization && userType) {
            try {
                const salt = await bcrypt.genSalt(10)
                const hashPassword = await bcrypt.hash(password, salt)
                const doc = new UserModel({
                name: name,
                email: email,
                password: hashPassword,
                phoneNumber:phoneNumber,
                organization:organization,
                status:false,
                userType:userType
                })
                await doc.save()
                const saved_user = await UserModel.findOne({ email: email })
                // Generate JWT Token
                const token = jwt.sign({ userID: saved_user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' })
                res.status(201).send({ "status": "success", "message": "Registration Success", "token":token })
            } catch (error) {
                // console.log(error)
                res.send({ "status": "failed", "message": "Unable to Register" })
            }
        } else {
            res.send({ "status": "failed", "message": "All fields are required" })
        }
        }
    }

    //Login function
    static userLogin = async (req,res) =>{
        try{
            const { email, password} = req.body
            if( email && password){
                const user = await UserModel.findOne({email:email})
                if(user != null){
                    const isMatch =await bcrypt.compare(password,user.password)
                    if((user.email=== email) && isMatch){
                        // Generate JWT Token
                        const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '35d' })
                        res.send({"status":"success", "message":"Login success", "token":token, "user":user})
                    }else{
                        res.send({"status":"failed", "message":"Email or Password is wrong"})
                    }
                }
                else{
                    res.send({"status":"failed", "message":"Please register first"})
                }
            }
        } catch(error){
            res.send({"status":"failed", "message":"Please enter credientials"})
        }

    }

    // changePassword
    static changeUserPassword = async (req, res)=>{
        const {password, password_confirmation} = req.body
        if(password && password_confirmation){
            if(password === password_confirmation){
                const salt = await bcrypt.genSalt(10)
                const newHashPassword = await bcrypt.hash(password, salt)
                res.send({"status":"success", "message":"Password Changed"})
                await UserModel.findByIdAndUpdate(req.user._id,{
                    $set:{
                        password:newHashPassword
                    }
                })
            }
            else{
                res.send({"status":"failed", "message":"Password Doesnot Match"})
            }
        }
        else{
            res.send({"status":"failed", "message":"All fields are required"})
        }
    }
    // user update
    static userUpdate = async (req, res)=>{
        const {name, fullName,image,email,password,phoneNumber,role,groupName,faceData ,status,timeIn, timeOut , remainings , total} = req.body
            await UserModel.findByIdAndUpdate(req.user._id,{
                $set:{
                    name:name,
                    fullName:fullName,
                    image:image,
                    email:email,
                    phoneNumber:phoneNumber,
                    role:role,
                    groupName:groupName,
                    faceData:faceData,
                    status:status,
                    timeIn:timeIn?timeIn:"",
                    timeOut:timeOut?timeOut:"",
                    remainings: remainings ? remainings : 15,
                    total: total ? total : 30,
                    
                }
            })
        res.send({"status":"success", "message":"User Updated"})
    }
  
    // get users
    static getUsers = async (req, res)=>{
        console.log('req ====',req.body)
        UserModel.find({_id:req.body.id},(err,data)=>{
            if(err)  {
                // console.log('err ====', err)
            }
                else {
                    res.send({"status":"success",total:data.length, data:data,})
                    // console.log('data ====', data)
             }      
        })

    }



    //Login user data
    static loggedUser = async (req,res)=>{
        // console.log('req ===', req)
        // console.log('res ===', res)
        res.send({"user":req.user})
    }

    // Reset password
    static sendUserPassResetEmail = async (req,res)=>{
        const {email} =  req.body
        if(email){
                const user = await UserModel.findOne({email: email})
                // console.log('user ===', user)
                if(user){
                    const secret = user._id + process.env.JWT_SECRET_KEY
                    const token = jwt.sign({userID:user._id},secret,{
                        expiresIn: '15m'
                    })
                    const link = `http://127.0.0.1:3000/api/user/reset/${user._id}/${token}`
                    // console.log('link ====', link)
                    // now you have to hit this api from front
                    //in case of native send this api and change your view. that view have to new function which is new function
                    
                    //Send Email

                    let info = await transporter.sendMail({
                        from: process.env.EMAIL_FROM,
                        to: user.email,
                        subject:"TimeTracking - Password Reset Link",
                        html: `<a href=${link}>Click here</a> to Reset your password`
                    })
                    res.send({"status":"success", "message":"Please Check your email, Password Reset Link is sent", "info":info})


                }else{
                    res.send({"status":"failed", "message":"Email Doesn't exists"})
                }
            }else{
            res.send({"status":"failed", "message":"Please Enter Email"})
            
        }
    }

    static userPasswordReset = async (req,res)=>{
        const { password, password_confirmation} = req.body
        const { id, token} = req.params
        const user = await UserModel.findById(id)
        const newSecret = user._id + process.env.JWT_SECRET_KEY
        try{
            jwt.verify(token, newSecret)
            if(password && password_confirmation){
                    if(password === password_confirmation){
                        const salt = await bcrypt.genSalt(10)
                        const newHashPassword = await bcrypt.hash(password,salt)
                        await UserModel.findByIdAndUpdate(user._id,{$set:{
                            password: newHashPassword
                        }})
                        res.send({"status":"success", "message":"Password reset successfully"})
                        
                    }
                    else{
                        res.send({"status":"failed", "message":"Password and Password_confirmation Doesn't match"})

                    }
            }
            else{
                res.send({"status":"failed", "message":"All Fields Required"})

            }
        }catch(error){
            // console.log('error ====',error)
            res.send({"status":"failed", "message":"Invalid Token"})

        }
        
    }
    static serverTest = async (req,res)=>{
        res.send({"status":"success", "message":"Server is alive"})
    }
    }

    export default UserController