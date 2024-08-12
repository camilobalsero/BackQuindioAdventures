const bcrypt = require("bcryptjs");
const db = require('../config/config-db.js');
import { Request, Response} from "express";
import Auth from "../Dto/AuthDto";
import UserService from "../services/Userservice";
import generateTokenAdmin from "../helpers/generateTokenAdmin";

const authAdminController = async (req: Request, res: Response)=> {
    try {
        const {email, password} = req.body;
        let role = 'administrador'
        const result : any= await UserService.authAdmin(new Auth(email,password));
        console.log(result);
        
        if (result.logged){
            return res.status(200).json({
                status: "Succesful Authentication",
                token:  await generateTokenAdmin(email,role)
            })
        }
        return res.status(401).json({ 
            status: 'Incorrect username or password'
        });
    } catch (error) {
        console.log(error);
        return error
    }
}

export default authAdminController;
