import { getMembershipByEmailService, registrationService, updateProfileImageMembershipService, updateProfileMembershipService } from "../model/membership.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import dotenv from 'dotenv'
import { uploadImageToFirebaseStorage } from "../utils/firebaseStorage.js"

dotenv.config()

export const registration = async (req,res) => {
    try{
        const {email,first_name="",last_name="",password} = req.body

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

export const login = async (req,res) => {
    try{
        const {email,password} = req.body

        const membership = await getMembershipByEmailService(email)
        if(!membership){
            return res.status(401).send({
                status:103,
                message:"Username atau password salah"
            })
        }

        const hashedPassword = membership.password
        const passwordMatch = await bcrypt.compare(password,hashedPassword)
        if(!passwordMatch){
            return res.status(401).send({
                status:103,
                message:"Username atau password salah"
            })
        }

        const token = jwt.sign({
            email:membership.email
        },process.env.JWT_SECRET_KEY,{
            expiresIn:'12h'
        })

        return res.status(200).send({
            status:0,
            message:"Login Sukses",
            data:{
                token
            }
        })

    }
    catch(err){
        return res.status(500).send({
            error:"Internal Server Error"
        })
    }
}

export const getProfile = async (req,res) => {
    try{
        const email = req.email
        const membership = await getMembershipByEmailService(email)
        return res.status(200).send({
            status:0,
            message:'Sukses',
            data:{
                email:membership.email,
                first_name:membership.first_name,
                last_name:membership.last_name,
                profile_image:membership.profile_image
            }
        })

    }
    catch(err){
        return res.status(500).send({
            error:"Internal Server Error"
        })
    }
}

export const updateProfile = async(req,res) => {
    try{
        const email = req.email 
        const {first_name,last_name} = req.body

        const membership = await updateProfileMembershipService(email,first_name,last_name)
        return res.status(200).send({
            status:0,
            message:"Update Profile berhasil",
            data:{
                email:membership.email,
                first_name: membership.first_name,
                last_name: membership.last_name,
                profile_image: membership.profile_image
            }
        })
    }
    catch(err){
        return res.status(500).send({
            error:"Internal Server Error"
        })
    }
}

export const updateProfileImage = async(req,res) => {
    try{
        const email = req.email
        const urlImage = await uploadImageToFirebaseStorage(req.file)

        const membership = await updateProfileImageMembershipService(email,urlImage)
        return res.status(200).send({
            status:0,
            message:"Update profile image sukses",
            data:{
                email:membership.email,
                first_name: membership.first_name,
                last_name: membership.last_name,
                profile_image: membership.filename_image
            }
        })
    }
    catch(err){
        console.log("updateProfileImage err = ",err)
        return res.status(500).send({
            error:"Internal Server Error"
        })
    }
}

export const getBalance = async(req,res) => {
    try{
        const email = req.email
        const membership = await getMembershipByEmailService(email)
        return res.status(200).send({
            status:0,
            message:'Sukses',
            data:{
                balance:membership.balance
            }
        })
    }
    catch(err){
        return res.status(500).send({
            error:"Internal Server Error"
        })
    }
}
