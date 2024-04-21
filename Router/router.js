import { Router } from "express";


const router = Router()


import * as usercontroller from "../Controller/User-controller.js"


router.route('/user/register').post(usercontroller.userRegister)
router.route('/user/login').post(usercontroller.userLogin)

export default router;