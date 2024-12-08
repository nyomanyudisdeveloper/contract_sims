import pool from "../config/db.js";

export const registrationService = async (email,first_name,last_name,password) => {
    const text = 'INSERT INTO membership (email,first_name,last_name,password) VALUES ($1,$2,$3,$4) RETURNING *'
    const values = [email,first_name,last_name,password]

    const res = await pool.query(text,values)
    return res.rows[0]
}

export const getMembershipByIDService = async(id) => {
    const text = "SELECT * FROM membership WHERE id = $1 and is_active = true"
    const values = [id]
    
    const res = await pool.query(text,values)
    return res.rows[0]
}

export const getMembershipByEmailService = async(email) => {
    const text = "SELECT * FROM membership WHERE email = $1 and is_active = true"
    const values = [email]
    
    const res = await pool.query(text,values)
    return res.rows[0]
}

export const updateProfileMembershipService = async(id,first_name,last_name) => {
    const text = "UPDATE membership SET first_name=$1,last_name=$2 WHERE id=$3 AND is_active=true RETURNING *"
    const values= [first_name,last_name,id]

    const res = await pool.query(text,values)
    return res.rows[0]
}

export const updateProfileImageMembershipService = async(id,filename) => {
    const text = "UPDATE membership SET fileName_image=$1 WHERE id=$2 AND is_active=true RETURNING *"
    const values = [filename,id]

    const res = await pool.query(text,values)
    return res.rows[0]
}

export const topUpBalanceMembershipService = async (email,amount) => {
    const text = "UPDATE membership SET BALANCE = (SELECT balance from membership WHERE email=$1 and is_active=true) + $2 WHERE email=$1 and is_active=true  RETURNING * "
    const values = [email,amount]

    const res = await pool.query(text,values)
    return res.rows[0]
}

export const paymentBalanceMembershipService = async (email,amount) => {
    const text = "UPDATE membership SET BALANCE = (SELECT balance from membership WHERE email=$1 and is_active=true) - $2 WHERE email=$1 and is_active=true  RETURNING * "
    const values = [email,amount]

    const res = await pool.query(text,values)
    return res.rows[0]
}