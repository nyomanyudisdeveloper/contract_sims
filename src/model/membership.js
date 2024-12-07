import pool from "../config/db.js";

export const registrationService = async (email,first_name,last_name,password) => {
    const text = 'INSERT INTO membership (email,first_name,last_name,password) VALUES ($1,$2,$3,$4) RETURNING *'
    const values = [email,first_name,last_name,password]

    const res = await pool.query(text,values)
    return res.rows[0]
}

export const getMembershipByEmailService = async(email) => {
    const text = "SELECT * FROM membership WHERE email = $1 and is_active = true"
    const values = [email]
    
    const res = await pool.query(text,values)
    return res.rows[0]
}

