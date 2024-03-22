
const express = require('express');
const router = express.Router();
const BusinessDetail = require('../models/settingdataModel')

router.put("/businessDetails", async (req, res) => {
    try {
         const businessDetails = {
            businessName: req.body.businessName,
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address,
            bio: req.body.bio
        };
          const updatedBusinessDetails = await BusinessDetail.findOneAndUpdate({}, businessDetails, { upsert: true, new: true, omitUndefined: true });
          res.status(200).json(updatedBusinessDetails);
    } catch (error) {
         if (error.name === 'ValidationError') {
            return res.status(400).json({ message: 'Validation error', error: error.message });
        }
         console.error('Error saving business details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



router.get("/businessDetails", async (req, res) => {
    try {
        const settingData = await BusinessDetail.find();
        res.status(200).json(settingData);
    } catch (error) {
        console.error('Error fetching customer data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


module.exports = router;