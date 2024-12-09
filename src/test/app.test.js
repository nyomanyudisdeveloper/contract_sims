import request from 'supertest';
import app from '../app.js';

describe('API Test Membership', () => {
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

    it('POST /registration validate password length', async () => {
        const payload = {email:'test@mailinator.com',password:'admin'}
        const response = await request(app).post('/registration').send(payload)
        expect(response.statusCode).toBe(400)
        expect(response.body).toEqual({
            "status": 102,
            "message": "Parameter email tidak sesuai format",
            "data": null
        })
    })
})