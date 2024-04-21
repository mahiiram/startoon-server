import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import AdminModel from "../Model/AdminModel.js";
import Usermodel from '../Model/Model.js';


export async function AdminRegister (req,res){
    const { email, password } = req.body;

    try {
        let user = await AdminModel.findOne({ email });

        if (user) {
            return res.status(400).json({
                message: "User email already exist"
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        user = new AdminModel({
            email,
            password: hashedPassword,
        })

        await user.save()

        return res.status(201).json({
            message: "User Register successfully"
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Something went wrong"
        })
    }
} 

export async function AdminLogin(req,res){

    const {email, password } = req.body;

    try {
        let user = await AdminModel.findOne({ email })
    
        if (!user) {
            return res.status(400).json({
                message: "Invalid Email or Name"  
            })
        }

        const isPasswordCorrect = await bcrypt.compareSync(password, user.password)

        if (!isPasswordCorrect) {
            return res.status(400).json({
                message: "Invalid Password"
            })
        }
        const token = jwt.sign({ userId: user._id}, process.env.SECRET_KEY, {
            expiresIn: "1d"
        })

        return res.status(201).json({
            message: "Login Sucessfully",
            token,
            Adminid:user._id,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Something went wrong"
        })
    }
}

export async function getAlluser(req,res){  //getuser by Auth token 
  try {
      let user = await Usermodel.find().select('-password')
      if(!user){
          return res.status(400).json({
              message:"User not found"
          })
      }
      res.status(200).json(user)
  } catch (error) {
   console.log(error)
   res.status(500).json({ message: 'Server Error' });
  }
}