import Usermodel from "../Model/Model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'


export async function userRegister (req,res){
    const { email, password, gender, name } = req.body;

    try {
        let user = await Usermodel.findOne({ email });

        if (user) {
            return res.status(400).json({
                message: "User email or name already exist"
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        user = new Usermodel({
            email,
            password: hashedPassword,
            gender,
            name
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

export async function userLogin(req,res){

    const { EmailOrName, password } = req.body;

    try {
        let user = await Usermodel.findOne({ email:EmailOrName })
        
        if (!user) {
            user = await Usermodel.findOne({ name:EmailOrName })
        }
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

        user.count += 1;
        user.lastLoginDate = new Date()
         await user.save()
        const token = jwt.sign({ userId: user._id}, process.env.SECRET_KEY, {
            expiresIn: "1d"
        })

        return res.status(201).json({
            message: "Login Sucessfully",
            token,
            id:user._id,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Something went wrong"
        })
    }
}