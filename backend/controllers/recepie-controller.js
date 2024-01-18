const Recepie = require('../models/recepie');
const multer  = require('multer');

const storage = multer.memoryStorage()
const upload = multer({storage: storage});



const CreateRecepie =async (req,res,next)=> {
console.log("req.body", req.body)
console.log("req file", req.file);
res.send({});
}

const getRecepies = async(req,res,next)=> {
    console.log('hello');
    res.send('hello')
}


module.exports = {
    CreateRecepie, getRecepies,
    upload
}