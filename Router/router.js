import { Router } from "express";


const router = Router()


import * as usercontroller from "../Controller/User-controller.js"
import { Auth } from "../Middleware/Auth.js";
import * as Admincontroller from "../Controller/Admin-controller.js"

//userrouter
router.route('/user/register').post(usercontroller.userRegister)
router.route('/user/login').post(usercontroller.userLogin)
router.route('/getuser').get(Auth,usercontroller.getuser)
//adminrouter
router.route('/admin/register').post(Admincontroller.AdminRegister)
router.route('/admin/login').post(Admincontroller.AdminLogin)
router.route('/admin/getalluser').get(Admincontroller.getAlluser)
export default router;