import express from 'express'
import cors from 'cors'
import membershipRouter from './routes/membershipRoute.js'
import swaggerSpec from '../swaggerConfig.js'
import swaggerUi from 'swagger-ui-express'
import { getFilePathImage } from './utils/stringHelper.js'


const app = express()

app.use(express.json())
app.use(cors())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

import fs from 'fs';
const publicDir = 'public/';
if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
}
const publicImageDir = 'public/images'
if (!fs.existsSync(publicImageDir)) {
    fs.mkdirSync(publicImageDir);
}


app.get('/images/:filename', (req,res) => {
    const {filename} = req.params
    const filePath = getFilePathImage(filename)
    fs.access(filePath,fs.constants.F_OK, (err) => {
        if (err) {
            return res.status(404).json({ message: 'Image not found!' });
        }
        res.sendFile(filePath);
    })
})

app.use("",membershipRouter)




app.get("/",async (req,res,next) => {
    return res.send("Hello World")
})

export default app