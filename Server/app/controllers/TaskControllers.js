
import TasksModels from "../models/TasksModels.js";
import mongoose from "mongoose";

export const CreateTask = async (req, res) => {
    try{
        let user_id = req.headers['user_id'];
        let reqBody = req.body;
        reqBody.user_id = req.headers['user_id'];
        await TasksModels.create(reqBody)
        return res.json({Status:"Success", Message:"Create New Task Successfully"});
    }
    catch(err){
        return res.json({Status:"fail", Message:"Task Create Failed", Error:err.toString()});

    }

}

export const UpdateTaskStatus = async (req, res) => {

    try{
        let id =req.params.id;
        let status = req.params.status;
        let user_id = req.headers['user_id'];
        await TasksModels.updateOne({'_id':id,'user_id':user_id},
            {status:status},
        )
        return res.json({Status:"Success", Message:"Task Update successfully"});
    }

    catch (e){
        return res.json({Status:"Fail", Message:"Task Update Failed", Error:e.toString()});
    }

}


export const TaskListByStatus =async (req, res) => {
    try{
        let user_id= req.headers['user_id'];
        let status = req.params.status;
        let data =await TasksModels.find({user_id: user_id, status:status});
        return res.json({Status:"Success", Message:"Task List by",data:data});
    }
    catch(err){
        return res.json({Status:"fail", Message:"Task List Failed", Error:err.toString()});
    }

}


export const DeleteTask = async (req, res) => {
    try {
        let id =req.params.id;
        let user_id = req.headers['user_id'];
        await TasksModels.deleteOne({'_id':id,'user_id':user_id});
        return res.json({Status:"Success", Message:"Task Deleted"});
    }
    catch (e){
        return res.json({Status:"fail", Message:"Task Delete Failed", Error:e.toString()});
    }
}


export const CountTask = async (req, res) => {
    try {
        let ObjectId=mongoose.Types.ObjectId
        let user_id=new ObjectId(req.headers['user_id'])
        let data=await TasksModels.aggregate([
            {$match:{user_id:user_id}},
            {$group:{_id:"$user_id",sum:{$count:{}}}}
        ])

        return res.json({Status:"Success", Message:"Task Count Done", data:data});
    }
    catch (e){
        return res.json({Status:"fail", Message:"Task Delete Failed", Error:e.toString()});
    }
}