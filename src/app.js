import express from 'express'
import cors from 'cors'
import membershipRouter from './routes/membershipRoute.js'
import swaggerSpec from '../swaggerConfig.js'
import swaggerUi from 'swagger-ui-express'

const app = express()

app.use(express.json())
app.use(cors())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("",membershipRouter)



app.get("/",async (req,res,next) => {
    return res.send("Hello World")
})

export default app