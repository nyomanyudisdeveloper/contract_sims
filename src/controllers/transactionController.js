import { paymentBalanceMembershipService, topUpBalanceMembershipService } from "../model/membership.js"
import { createNewTransactionService, getDetailTransactionService } from "../model/transaction.js"


export const topUp = async (req,res,next) => {
    try{
        const {top_up_amount} = req.body
        const email = req.email
        const membership = await topUpBalanceMembershipService(email,top_up_amount)
        const transaction = await createNewTransactionService("ada","TOPUP",null,top_up_amount)
        return res.status(200).send({
            status:0,
            message:"Top Up Balance berhasil",
            data:{
                balance:membership.balance
            }
        })
    }
    catch(err){
        console.log("topUp err = ",err)
        return res.status(500).send({
            error:"Internal Server Error"
        })
    }
}

export const transaction = async (req,res) => {
    try{
        const {service_id,amount} = req.data
        const email = req.email

        const membership = await paymentBalanceMembershipService(email,amount)
        const newTransaction = await createNewTransactionService("ada","PAYMENT",service_id,amount)

        const transactionDetail = await getDetailTransactionService(newTransaction.id)
        return res.status(200).send({
            status:0,
            message:"Transaksi Berhasil",
            data:{
                invoice_number:transactionDetail.invoice_number,
                service_code:transactionDetail.service_code,
                service_name:transactionDetail.service_name,
                transaction_type:transactionDetail.transaction_type,
                total_amount:transactionDetail.total_amount,
                created_on: transactionDetail.created_on
            }
        })
    }
    catch(err){
        console.log("transaction err = ",err)
        return res.status(500).send({
            error:"Internal Server Error"
        })
    }
}

export const getTransactionHistory = async(req,res,next) => {
    try{

    }
    catch(err){
        console.log("transaction err = ",err)
        return res.status(500).send({
            error:"Internal Server Error"
        })
    }
}