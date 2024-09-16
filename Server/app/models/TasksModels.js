import mongoose from 'mongoose';
const TaskSchema = new mongoose.Schema(
    {
        tittle: {type: String,required:true},
        Description: {type: String,required:true},
        status: {type: String},
        user_id: {type: mongoose.Schema.Types.ObjectId, required:true },
    },
    {timestamps: true,versionKey:false}

)


const Task = mongoose.model('Task', TaskSchema);
export default Task;