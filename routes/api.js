const express = require('express');
const apiController = require('../controllers/api');
const router = express.Router();

router.get('/models', apiController.getModels);
router.get('/scs/:modelname', apiController.getSCS);
router.get('/png/:modelname', apiController.getPNG);

module.exports = router;

