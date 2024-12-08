import { paymentBalanceMembershipService, topUpBalanceMembershipService } from "../model/membership.js"
import { createNewTransactionService, getDetailTransactionService } from "../model/transaction.js"
import { getResponseInternalServerError, ResponseStatus } from "../utils/responseHelper.js"


export const topUp = async (req,res,next) => {
    try{
        const {top_up_amount} = req.body
        const membership_id = req.membership_id
        const membership = await topUpBalanceMembershipService(membership_id,top_up_amount)
        const transaction = await createNewTransactionService("ada","TOPUP",null,top_up_amount)
        return res.status(200).send({
            status:ResponseStatus.SUCCESS,
            message:"Top Up Balance berhasil",
            data:{
                balance:membership.balance
            }
        })
    }
    catch(err){
        return res.status(500).send(getResponseInternalServerError())
    }
}

export const transaction = async (req,res) => {
    try{
        const {service_id,amount} = req.data
        const membership_id = req.membership_id

        const membership = await paymentBalanceMembershipService(membership_id,amount)
        const newTransaction = await createNewTransactionService("ada","PAYMENT",service_id,amount)

        const transactionDetail = await getDetailTransactionService(newTransaction.id)
        return res.status(200).send({
            status:ResponseStatus.SUCCESS,
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
        return res.status(500).send(getResponseInternalServerError())
    }
}

export const getTransactionHistory = async(req,res,next) => {
    try{

    }
    catch(err){
        return res.status(500).send(getResponseInternalServerError())
    }
}