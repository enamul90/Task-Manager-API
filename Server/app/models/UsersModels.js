import mongoose from 'mongoose';
const UserSchema = new mongoose.Schema(
    {
        email: {type: String, unique: true,},
        fastName: {type: String},
        lastName: {type: String},
        mobile: {type: String},
        password: {type: String, required: true,},
        otp: {type: String},
    },
    {timestamps: true,versionKey:false}

)


const User = mongoose.model('users', UserSchema);
export default User;