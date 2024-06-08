const rentalService = require('../services/rentalService');

exports.calculateRental = (req, res) => {
    try {
        const { pickUpDate, returnDate, discount, vehicle, collisionDamageWaiver, liabilityInsurance, rentalTax } = req.body;
        const result = rentalService.calculateTotal({ pickUpDate, returnDate, discount, vehicle, collisionDamageWaiver, liabilityInsurance, rentalTax });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
