import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const uploadImage = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, 
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'), false);
        }
    }
});

export const checkFileIsImage = async (req,res,next) => {
    const uploadSingle = uploadImage.single("image");

    uploadSingle(req, res, (err) => {
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

