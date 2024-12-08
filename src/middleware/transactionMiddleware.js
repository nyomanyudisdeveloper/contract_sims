import { getServiceByID } from "../model/information.js"
import { getMembershipByEmailService } from "../model/membership.js"


export const validateServiceID = async (req,res,next) => {
    const {service_id} = req.body
    const email = req.email
    if(!service_id){
        return res.status(400).send({
            status:102,
            message:"Parameter service_id harus diisi",
            data:null
        })
    }
    const service = await getServiceByID(service_id)
    const {service_tarif} = service
    if(!service){
        return res.status(400).send({
            status:102,
            message:"Service atau layanan tidak ditemukan",
            data:null
        })
    }
    
    const membership = await getMembershipByEmailService(email)
    const {balance} = membership
    if(balance < service_tarif){
        return res.status(400).send({
            status:102,
            message:"Saldo balance tidak cukup untuk membayar service atau layanan ini",
            data:null
        })
    }
    req.data = {
        amount:service.service_tarif,
        service_id:service_id
    }
    next()
}