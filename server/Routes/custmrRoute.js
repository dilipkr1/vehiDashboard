
const express = require('express');
const router = express.Router();

const Customer = require('../models/custmrModel')

router.post("/details", async (req, res) => {
        try {
                const newCustomer = new Customer({
                        customerName: req.body.customerName,
                        customerEmail: req.body.customerEmail,
                        customerPhone: req.body.customerPhone,
                        customerAddress: req.body.customerAddress
                });

                const customer = await newCustomer.save();
                res.status(200).json(customer);
        } catch (error) {
                if (error.name === 'ValidationError') {
                        return res.status(400).json({ message: 'Validation error', error: error.message });
                }
                console.error('Error saving customer details:', error);
                res.status(500).json({ message: 'Internal server error' });
        }
});
 

router.get('/details', async (req, res) => {
        try {
                const customers = await Customer.find();

                res.status(200).json(customers);
        } catch (error) {
                console.error('Error fetching customer data:', error);
                res.status(500).json({ message: 'Internal server error' });
        }
});



router.delete("/delete-customer/:id", async (req, res) => {
        try {
                const deleteCustomer = await Customer.deleteOne({ _id: req.params.id })
                if (deleteCustomer.deletedCount === 0) {
                        return res.status(400).json({ message: "Customer Not Found" })
                } else {
                        res.status(200).json({ message: "Deleted successfully" })
                }
        } catch (error) {
                console.error(error)
                res.status(500).json({ message: "Internal Server Error" })
        }
})


router.put("/update/:id", async (req, res) => {
        const customerid = req.params.id;
        const updataeCustomer = req.body
        try {
                const existingCustomer = await Customer.findById(customerid);

                if (!existingCustomer) {
                        res.status(400).json({ success: false, message: "Customer not Found" });
                }
                Object.assign(existingCustomer, updataeCustomer);
                await existingCustomer.save();
                res.status(200).json({ success: true, message: "CustomerDeataisls updated successfully" });

        } catch (error) {
                console.error(error)
                res.status(500).json({ message: "Internal Server Error" })

        }
})


module.exports = router;