import request from 'supertest';
import app from '../app.js';
import { expectNoToken ,getToken} from './utils/requestTemplate.js';
import { responseSchemaGetBalanceSuccess } from './schema/schemaTransaction.js';

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
