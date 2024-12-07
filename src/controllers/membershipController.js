import { getMembershipByEmailService, registrationService } from "../model/membership.js"
import bcrypt from "bcryptjs"
import { validateEmail } from "../utils/stringHelper.js"

export const registration = async (req,res,next) => {
    try{
        const {email,first_name="",last_name="",password} = req.body

        if(!email || !password){
            return res.status(400).send({
                status:101,
                error:"Request ini membutuhkan parameter email dan password",
                data:null
            })
        }

        if(!validateEmail(email)) {
            return res.status(400).send({
                status:102,
                error:"Parameter email tidak sesuai format",
                data:null
            })
        }
        if(password.length < 8){
            return res.status(400).send({
                status:103,
                error:"Parameter password memiliki panjang kurang dari 8",
                data:null
            })
        }

        const membership = await getMembershipByEmailService(email)
        if(membership){
            return res.status(400).send({
                status:104,
                error:"Email sudah terdaftar",
                data:null
            })
        }

        const hashedPassowrd = await bcrypt.hash(password,10)
        const data = await registrationService(email,first_name,last_name,hashedPassowrd)
        return res.status(200).send({
            status:0,
            error:"Registrasi berhasil silahkan login",
            data:null
        })
    }
    catch(err){
        return res.status(500).send({
            error:"Internal Server Error"
        })
    }
}