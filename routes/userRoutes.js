import express from 'express';
const router = express.Router();
import UserController from '../controllers/userController.js';
import AttendanceController from '../controllers/AttendanceController.js';
import ProjectController from '../controllers/projectController.js';
import ActivityController from '../controllers/activityController.js';
import checkUserAuth from '../middlewares/authMiddleware.js';

// Route level middleware - to protect route
router.use('/changepassword', checkUserAuth)
router.use('/loggedUser', checkUserAuth)
router.use('/markInAttendance', checkUserAuth)
router.use('/markOutAttendance', checkUserAuth)
router.use('/addProject', checkUserAuth)
router.use('/editProject', checkUserAuth)
router.use('/deleteProject', checkUserAuth)
router.use('/addActivity', checkUserAuth)
router.use('/editActivity', checkUserAuth)
router.use('/deleteActivity', checkUserAuth)
router.use('/userUpdate', checkUserAuth)
router.use('/getUsers', checkUserAuth)
router.use('/getActivities', checkUserAuth)
router.use('/getprojects', checkUserAuth)
router.use('/getTimeInfo', checkUserAuth)
router.use('/getTimeInfoProject', checkUserAuth)
router.use('/getTimeReport', checkUserAuth)

// Public Routes
router.post('/register', UserController.userRegistration)
router.post('/login', UserController.userLogin)
router.post('/send-user-password-reset-email', UserController.sendUserPassResetEmail)
router.post('/reset-password/:id/:token', UserController.userPasswordReset)
router.get('/serve', UserController.serverTest)

// Protected Routes
router.post('/changepassword', UserController.changeUserPassword)
router.get('/loggedUser', UserController.loggedUser)
router.post('/userUpdate', UserController.userUpdate)
router.get('/getUsers', UserController.getUsers)

// attendance 
router.post('/markInAttendance', AttendanceController.markAttendance)
router.post('/markOutAttendance', AttendanceController.markAttendance)

router.get('/getTimeInfo', AttendanceController.getTimeInfo)
router.get('/getTimeInfoProject', AttendanceController.getTimeInfoProject)
router.get('/getTimeReport', AttendanceController.getTimeReport)


// Project
router.post('/addProject', ProjectController.addProject)
router.put('/editProject', ProjectController.editProject)
router.delete('/deleteProject', ProjectController.deleteProject)
router.get('/getprojects', ProjectController.getprojects)

// Activity
router.post('/addActivity', ActivityController.addActivity)
router.put('/editActivity', ActivityController.editActivity)
router.delete('/deleteActivity', ActivityController.deleteActivity)
router.get('/getActivities', ActivityController.getActivities)

export default router