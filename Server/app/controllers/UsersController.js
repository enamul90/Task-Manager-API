import UsersModels from "../models/UsersModels.js";
import {TokenEncode} from "../utility/TokenUtility.js";
import usersModels from "../models/UsersModels.js";
import SendEmail from "../utility/emailUtility.js";


export const Registration = async (req, res) => {

    try{
        let reqBody = req.body;
        await UsersModels.create(reqBody);
        return res.json({Status:"Success", Message:"User register Successfully"});
    }
    catch(err){
        return res.json({Status:"fail", Message:"user register failed", Error:err.toString()});

    }

}


export const Login = async (req, res) => {

    try{
        let reqBody = req.body;
        let data = await UsersModels.findOne(reqBody);
        if(data==null){
            return res.json({Status:"fail", Message:"User does not exist"});
        }


        else {
            let token=TokenEncode(data['email'],data['_id'])
            return res.json({Status:"success", Message:"User login Successfully",data:{token:token}});
        }

    }

    catch(err){
        return res.json({Status:"fail", Message:"user register failed", Error:err.toString()});

    }

}




export const ProfileDetail = async (req, res) => {

    try{
        let user_id = req.headers['user_id'];
        let data =await UsersModels.findOne({'_id':user_id});
        return res.json({Status:"success", Message:"User profile successfully",User_Info:data});
    }
    catch (e){
        return res.json({Status:"fail", Message:"user profile failed", Error:e.toString()});
    }
}



export const ProfileUpdate = async (req, res) => {

    try{
        let reqBody = req.body;
        let user_id = req.headers['user_id'];
        let data =await UsersModels.updateOne({'_id':user_id},reqBody);
        return res.json({Status:"Success", Message:"User Update Successfully"});

    }
    catch(err){
        return res.json({Status:"fail", Message:"user Update failed", Error:err.toString()});

    }

}



export const EmailVerify = async (req, res) => {

    try {
        let email=req.params.email;
        let data = await usersModels.findOne({email:email});
        if(data==null){
            return res.json({Status:"fail", Message:"User does not exist"});
        }

        else {

            //sent otp
            let code = Math.floor(100000+Math.random()*90000);
            let EmailTo = data['email']
            let EmailText= "Your Code is "+code;
            let EmailSubject="task manager app  Code";

            await SendEmail(EmailTo, EmailText, EmailSubject);

            //update otp
            await UsersModels.updateOne({email:email},{otp:code})

            return res.json({Status:"success", Message:"User Update Successfully",Data:data});
        }
    }

    catch (e){
        return res.json({Status:"fail", Error:e.toString()});
    }

}



export const CodeVerify = async (req, res) => {

    try{
        let reqBody= req.body;
        let data= await UsersModels.findOne({email:reqBody['email'],otp:reqBody['otp']});

        if(data==null){
            return res.json({Status:"fail", Message:"OTP Don't Mach"});
        }

        else {
            return res.json({Status:"success", Message:"Verification successfully"});
        }
    }

    catch (e){
        return res.json({Status:"fail", Message:"OTP Don't Mach"});
    }

}

export const ResetPassword = async (req, res) => {

    try{
        let reqBody= req.body;
        let data= await UsersModels.findOne({email:reqBody['email'],otp:reqBody['otp']});

        if(data==null){
            return res.json({Status:"fail", Message:"OTP Don't Mach"});
        }

        else {
            await UsersModels.updateOne({email: reqBody['email']},{
                otp:"0", password:reqBody['password'],
            })

            return res.json({Status:"success", Message:"New Password Created Successfully"});
        }
    }

    catch (e){
        return res.json({Status:"fail", Message:"Password Change Failed"});
    }

}