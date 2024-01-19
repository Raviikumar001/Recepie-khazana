const Recepie = require('../models/recepie');





const getRecepies = async(req,res,next)=> {
    console.log('hello', req.params);
    
}


module.exports = {
    CreateRecepie, getRecepies,
    upload
}