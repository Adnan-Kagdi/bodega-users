const express = require("express");
const router = express.Router();
const deliveryController = require("../controllers/deliveryController");

router.post("/update-delivery", deliveryController.updateDeliveryStatus);

module.exports = router;
