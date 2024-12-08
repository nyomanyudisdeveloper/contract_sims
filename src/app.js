import express from 'express'
import cors from 'cors'
import membershipRouter from './routes/membershipRoute.js'
import informationRouter from './routes/informationRoute.js'
import transactionRouter from './routes/transactionRoute.js'
import swaggerSpec from '../swaggerConfig.js'
import swaggerUi from 'swagger-ui-express'
import { getFilePathImage } from './utils/stringHelper.js'

const app = express()


app.use(express.json())
app.use(cors())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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
app.use("",informationRouter)
app.use("",transactionRouter)


app.get("/",async (req,res,next) => {
    return res.send("Hello World")
    
})


// app.get("/upload",async (req,res,next) => {
//     const filePath = getFilePathImage("test.png")
//     const firebaseStoragePath = 'images/image.jpg';
//     uploadImage(filePath,firebaseStoragePath)
//     return res.send("Hello World 2")
// })

export default app