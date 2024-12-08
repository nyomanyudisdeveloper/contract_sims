import pool from "../config/db.js"

export const createNewTransactionService = async (invoice_number,transaction_type,service_id,total_amount) => {
    const textInsert = " INSERT INTO transaction(invoice_number,transaction_type,service_id,total_amount) VALUES($1,$2,$3,$4) RETURNING *"
    const valuesInsert = [invoice_number,transaction_type,service_id,total_amount]
    
    const newTransaction = await pool.query(textInsert,valuesInsert)
   
    return newTransaction.rows[0]
}

export const getDetailTransactionService = async(transaction_id) => {
    const text = `
        SELECT a.invoice_number, a.transaction_type,
            CASE 
                WHEN b.id = NULL THEN 'Top Up Balance'
            ELSE b.service_name
            END AS description, 
            a.total_amount,
            a.created_on,
            b.service_code,
            b.service_name
        FROM transaction a
        LEFT JOIN services b 
            ON a.service_id = b.id
        WHERE a.id = $1
        AND a.is_active = true
    `
    const values = [transaction_id]
    
    const transaction = await pool.query(text,values)
    return transaction.rows[0]
}