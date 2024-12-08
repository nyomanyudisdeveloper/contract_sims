import { getBannersService, getServicesModel } from "../model/information.js"


export const getBanners = async (req,res) => {
    try{
        const banners = await getBannersService()
        return res.status(200).send({
            status:0,
            message:"Sukses",
            data:banners
        })
    }
    catch(err){
        return res.status(500).send({
            error:"Internal Server Error"
        })
    }
}

export const getServices = async (req,res) => {
    try{
        const services = await getServicesModel()
        return res.status(200).send({
            status:0,
            message:'Sukses',
            data:services
        })
    }
    catch(err){
        console.log("getServices err = ",err)
        return res.status(500).send({
            error:"Internal Server Error"
        })
    }
}