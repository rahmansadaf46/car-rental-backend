const express = require('express');
const router = express.Router();
const rentalController = require('../controllers/rentalController');

router.post('/calculate', rentalController.calculateRental);

module.exports = router;
