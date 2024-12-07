import {validateEmail} from '../utils/stringHelper.js'

export const validateEmailAndPassword = async (req,res,next) => {
    const {email,password} = req.body
    if(!email){
        return res.status(400).send({
            status:101,
            message:"Parameter email harus diisi",
            data:null
        })
    }
    else if (!password){
        return res.status(400).send({
            status:102,
            message:"Parameter password harus diisi",
            data:null
        })
    }
    else if(!validateEmail(email)) {
        return res.status(400).send({
            status:103,
            message:"Parameter email tidak sesuai format",
            data:null
        })
    }
    else if(password.length < 8){
        return res.status(400).send({
            status:104,
            message:"Parameter password memiliki panjang kurang dari 8",
            data:null
        })
    }
    next()
}

export const checkEmailAndPasswordExists = async (req,res,next) => {
    const {email,password} = req.body
    if(!email || !password){
        return res.status(400).send({
            status:101,
            message:"Request ini membutuhkan parameter email dan password",
            data:null
        })
    }
    next()
}

export const checkFirstAndLastNameExists = async (req,res,next) => {
    const {first_name,last_name} = req.body
    if(!first_name){
        return res.status(400).send({
            status:102,
            message:"Parameter first_name harus diisi",
            data:null
        })
    }
    else if(!last_name){
        return res.status(400).send({
            status:102,
            message:"Parameter last_name harus diisi",
            data:null
        })
    }
    next()
}