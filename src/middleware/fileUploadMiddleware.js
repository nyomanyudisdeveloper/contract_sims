import multer from 'multer';

const uploadImage = multer({ 
    storage: multer.memoryStorage(),
    // limits: { fileSize: 5 * 1024 * 1024 }, 
    // fileFilter: (req, file, cb) => {
    //     if (file.mimetype.startsWith('image/')) {
    //         cb(null, true);
    //     } else {
    //         cb(new Error('Only image files are allowed!'), false);
    //     }
    // }
});

export const checkFileIsImage = async (req,res,next) => {
    console.log("checkFileIsImage")
    const uploadSingle = uploadImage.single("image");

    uploadSingle(req, res, (err) => {
        console.log("uploadSingle")
        if (err) {
            return res.status(400).send({
                status:102,
                message: 'Format Image tidak sesuai',
                data:null 
            })
        }

        if (!req.file) {
            return res.status(400).send({ 
                status:102,
                message: 'Field file tidak boleh kosong',
                data:null 
            });
        }

        next()
    });
}

