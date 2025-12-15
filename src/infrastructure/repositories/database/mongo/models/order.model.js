const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
      trim: true,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        name: { type: String, required: true }, // nombre del producto  (Cuando se realizo la compra)
        price: { type: Number, required: true, min: 0 }, // precio histórico
        quantity: { type: Number, required: true, min: 1 },
        subtotal: { type: Number, required: true, min: 0 }, // price * quantity
      },
    ],
    total: {
      type: Number,
      required: true,
      min: 0,
    },
    paymentType: {
      type: String,
      enum: ["efectivo", "tarjeta", "transferencia", "QR"],
      default: "efectivo",
    },
    // coupon: { type: mongoose.Schema.Types.ObjectId, ref: "coupon", default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
