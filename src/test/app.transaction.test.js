import request from 'supertest';
import app from '../app.js';
import { expectNoToken ,getToken} from './utils/requestTemplate.js';
import { responseSchemaGetBalanceSuccess, responseSchemaTopUpSuccess } from './schema/schemaTransaction.js';

describe('API Test GET /balance', () => {
    it('GET /balance success', async() => {
        const token = await getToken()
        const response = await request(app).get('/balance').set('Authorization',`Bearer ${token}`)
        expect(response.statusCode).toBe(200)
        const {error} = responseSchemaGetBalanceSuccess.validate(response.body)
        expect(error).toBeUndefined()
    })

    it('GET /balance unauthorized', async () => {
        const response = await request(app).get('/balance')
        expectNoToken(response)
    })
})

describe('API Test POST /topup', () => {
    it('POST /topup parameter top_up success', async () => {
        const token = await getToken()
        const payload = {top_up_amount:100}
        const response = await request(app).post('/topup').set('Authorization',`Bearer ${token}`).send(payload)
        expect(response.statusCode).toBe(200)
        const {error} = responseSchemaTopUpSuccess.validate(response.body)
        expect(error).toBeUndefined()
    })

    it('POST /topup parameter top_up amount lebih dari 0', async () => {
        const token = await getToken()
        const payload = {top_up_amount:-10}
        const response = await request(app).post('/topup').set('Authorization',`Bearer ${token}`).send(payload)
        expect(response.statusCode).toBe(400)
        expect(response.body).toEqual({
            status:102,
            message:"Parameter amount hanya boleh angka dan tidak boleh lebih kecil dari 0",
            data:null
        })
    })

    it('POST /topup parameter top_up amount harus angka', async () => {
        const token = await getToken()
        const payload = {top_up_amount:"ada"}
        const response = await request(app).post('/topup').set('Authorization',`Bearer ${token}`).send(payload)
        expect(response.statusCode).toBe(400)
        expect(response.body).toEqual({
            status:102,
            message:"Parameter amount hanya boleh angka dan tidak boleh lebih kecil dari 0",
            data:null
        })
    })

    it('POST /topup parameter top_up amount harus diisi', async () => {
        const token = await getToken()
        const response = await request(app).post('/topup').set('Authorization',`Bearer ${token}`)
        expect(response.statusCode).toBe(400)
        expect(response.body).toEqual({
            status:102,
            message:"Parameter top_up_amount harus diisi",
            data:null
        })
    })

    it('POST /topup unauthorized', async () => {
        const response = await request(app).post('/topup')
        expectNoToken(response)
    })
})