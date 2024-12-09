import request from 'supertest';
import app from '../app.js';
import { v4 as uuidv4 } from 'uuid';

describe('API Test Membership', () => {
    it('POST /registration sukses regristrasi membership', async () => {
        const email = `${uuidv4()}@mailinator.com`
        const payload = {email,password:'admin1234'}
        const response = await request(app).post('/registration').send(payload)
        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual({
            "status": 0,
            "message": "Registrasi berhasil silahkan login",
            "data": null
        })
    })

    it('POST /registration validate format email', async () => {
        const payload = {email:'test',password:'admin1234'}
        const response = await request(app).post('/registration').send(payload)
        expect(response.statusCode).toBe(400)
        expect(response.body).toEqual({
            "status": 102,
            "message": "Parameter email tidak sesuai format",
            "data": null
        })
    })

    it('POST /registration validate email sudah terdaftar', async () => {
        const payload = {email:'test@mailinator.com',password:'admin1234'}
        const response = await request(app).post('/registration').send(payload)
        expect(response.statusCode).toBe(400)
        expect(response.body).toEqual({
            "status": 102,
            "message": "Email sudah terdaftar",
            "data": null
        })
    })

    it('POST /registration validate parameter email harus diiisi', async () => {
        const payload = {password:'admin'}
        const response = await request(app).post('/registration').send(payload)
        expect(response.statusCode).toBe(400)
        expect(response.body).toEqual({
            "status": 102,
            "message": "Parameter email harus diisi",
            "data": null
        })
    })

    it('POST /registration validate parameter password harus diiisi', async () => {
        const payload = {email:'test@mailinator.com'}
        const response = await request(app).post('/registration').send(payload)
        expect(response.statusCode).toBe(400)
        expect(response.body).toEqual({
            "status": 102,
            "message": "Parameter password harus diisi",
            "data": null
        })
    })

    it('POST /registration validate password length', async () => {
        const payload = {email:'test@mailinator.com',password:'admin'}
        const response = await request(app).post('/registration').send(payload)
        expect(response.statusCode).toBe(400)
        expect(response.body).toEqual({
            "status": 102,
            "message": "Parameter password memiliki panjang kurang dari 8",
            "data": null
        })
    })
})