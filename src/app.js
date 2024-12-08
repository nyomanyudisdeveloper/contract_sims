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

// import fs from 'fs';
// const publicDir = 'public/';
// if (!fs.existsSync(publicDir)) {
//     fs.mkdirSync(publicDir);
// }
// const publicImageDir = 'public/images'
// if (!fs.existsSync(publicImageDir)) {
//     fs.mkdirSync(publicImageDir);
// }


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

// import admin from 'firebase-admin'
// import path from 'path'
// import fs from 'fs'

// import serviceAccount from '../firebase.json' assert { type: 'json' };

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     storageBucket: 'gs://contractsim', // Replace with your bucket URL
// });

// const bucket = admin.storage().bucket();

// async function uploadImage(filePath, destination) {
//     try {
//       // Upload the file
//       await bucket.upload(filePath, {
//         destination: destination, // Path in Firebase Storage
//         public: true, // Optional: Make the file public
//         metadata: {
//           contentType: 'image/jpeg', // Replace with your file's MIME type
//         },
//       });
  
//       console.log(`${filePath} uploaded to Firebase Storage at ${destination}`);
//     } catch (error) {
//       console.error('Error uploading file:', error);
//     }
// }

// app.get("/upload",async (req,res,next) => {
//     const filePath = getFilePathImage("test.txt")
//     const firebaseStoragePath = 'images/image.jpg';
//     uploadImage(filePath,firebaseStoragePath)
//     return res.send("Hello World 2")
// })

export default app