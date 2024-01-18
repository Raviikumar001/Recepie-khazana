const express = require('express');
const router  = express.Router();
const {CreateRecepie,getRecepies, upload} = require('../controllers/recepie-controller');




router.route('/create-recepie',upload.array('image',12)).post(CreateRecepie);
router.route('/get-recepie').get(getRecepies)

module.exports = router;



