const express = require('express');
const router  = express.Router();
const multer  = require('multer');
const crypto = require('crypto');
const sharp = require('sharp');

// const {getRecepies} = require('../controllers/recepie-controller');

const Recipe = require('../models/recepie');
const { v4: uuidv4 } = require('uuid');
const { getRecepiesById,getRecepies, updateRecepie , deleteRecepie} = require('../controllers/recepie-controller');
const { S3Client, PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");

const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");


require('dotenv').config();
const storage = multer.memoryStorage()
const upload = multer({storage: storage});


const bucketRegion  = process.env.BUCKET_REGION
const bucketName   = process.env.BUCKET_NAME
const accessKey  = process.env.ACCESS_KEY
const secretAccessKey=process.env.SECRET_ACCESS_KEY



const randomImageName =(bytes =32) =>crypto.randomBytes(bytes).toString('hex');

const s3= new S3Client({
    credentials: {
        accessKeyId :accessKey,
        secretAccessKey: secretAccessKey,
    },
    region: bucketRegion
})



router.route('/get-recepies').get(getRecepies);
router.route('/get-recepieById').get(getRecepiesById);
router.route('/update-recepie').patch(updateRecepie);
router.route('/delete-recepie').delete(deleteRecepie);




















router.post('/create-recepie', upload.array('images', 5), async (req, res, next) => {
    // console.log("req body", req.body);
    // console.log("req files", req.files);

    const uploadedImageUrls = [];

    try {
        await Promise.all(req.files.map(async (file) => {
            const imageName = randomImageName();
            const resizedBuffer = await sharp(file.buffer)
                .resize({ height: 1920, width: 1080, fit: 'contain' })
                .toBuffer();

            const params = {
                Bucket: bucketName,
                Key: imageName,
                Body: resizedBuffer,
                ContentType: file.mimetype,
            };

            const command = new PutObjectCommand(params);

            try {
                const response = await s3.send(command);
                // console.log(response)

                const expiresIn = (6 * 24 * 60 * 60) + (12 * 60 * 60);

                // Generate a signed URL for the uploaded image (without expiration)
                const signedUrl = await getSignedUrl(
                    s3,
                    new GetObjectCommand({ Bucket: bucketName, Key: imageName }),
                    { expiresIn }
                );

                uploadedImageUrls.push(signedUrl);
                // console.log(`Resized and uploaded ${file.originalname} successfully.`);
            } catch (error) {
                console.error(`Error uploading ${file.originalname}:`, error);
            }
        }));

        // Create a new Recipe with the signed URLs
        const newRecipe = new Recipe({
            creator: req.query.id,
            title: req.body.title,
            recepieId: uuidv4(),
            description:req.body.description,
            ingredients:req.body.ingrediants,
            recepieSteps:req.body.recepieSteps,

            images: uploadedImageUrls,
        });

        await newRecipe.save();

        console.log('Recipe created successfully.');

        res.status(201).json({ recepie: newRecipe, message: 'Recipe created successfully'});
    } catch (error) {
        console.error('Error creating Recipe:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



module.exports = router;



