import express from 'express';
const router = express.Router();
import * as UsersController from '../app/controllers/UsersController.js';
import * as TaskControllers from '../app/controllers/TaskControllers.js';
import authMiddleware from "../app/middlewares/authMiddleware.js";


// User API
router.post('/Registration',UsersController.Registration)
router.post('/Login',UsersController.Login)
router.get('/ProfileDetail',authMiddleware,UsersController.ProfileDetail)
router.post('/ProfileUpdate',authMiddleware,UsersController.ProfileUpdate)
router.post('/EmailVerify/:email',UsersController.EmailVerify)
router.post('/CodeVerify',UsersController.CodeVerify)
router.post('/ResetPassword',UsersController.ResetPassword)

// User Task Control
router.post('/CreateTask',authMiddleware,TaskControllers.CreateTask)
router.get('/UpdateTaskStatus/:id/:status',authMiddleware,TaskControllers.UpdateTaskStatus)
router.get('/TaskListByStatus/:status',authMiddleware,TaskControllers.TaskListByStatus)
router.get('/DeleteTask/:id',authMiddleware,TaskControllers.DeleteTask)
router.get('/CountTask/',authMiddleware,TaskControllers.CountTask)






export default router;