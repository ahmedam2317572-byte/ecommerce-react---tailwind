import express from "express";
import { CartItem } from "../models/CartItem.js";
import { Product } from "../models/Product.js";
import { DeliveryOption } from "../models/DeliveryOption.js";

const router = express.Router();

const getDeviceId = (req) =>
  req.headers["x-device-id"] || req.headers["device-id"];

router.get("/", async (req, res) => {
  const deviceId = getDeviceId(req);
  if (!deviceId) {
    return res.status(400).json({ error: "Device ID is required" });
  }

  const cartItems = await CartItem.findAll({ where: { deviceId } });
  let totalItems = 0;
  let productCostCents = 0;
  let shippingCostCents = 0;

  for (const item of cartItems) {
    const product = await Product.findByPk(item.productId);
    const deliveryOption = await DeliveryOption.findByPk(item.deliveryOptionId);
    totalItems += item.quantity;
    productCostCents += product.priceCents * item.quantity;
    shippingCostCents += deliveryOption.priceCents;
  }

  const totalCostBeforeTaxCents = productCostCents + shippingCostCents;
  const taxCents = Math.round(totalCostBeforeTaxCents * 0.1);
  const totalCostCents = totalCostBeforeTaxCents + taxCents;

  res.json({
    totalItems,
    productCostCents,
    shippingCostCents,
    totalCostBeforeTaxCents,
    taxCents,
    totalCostCents,
  });
});

export default router;
