class Order {
  constructor(
    id,
    customerName,
    items,
    total,
    paymentType,
    createdAt,
    updatedAt
  ) {
    this.id = id; // string (ObjectId convertido a string)
    this.customerName = customerName;
    this.items = items.map((item) => ({
      productId: item.productId, // string (ObjectId convertido a string)
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      subtotal: item.subtotal,
    }));
    this.total = total;
    this.paymentType = paymentType;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

module.exports = Order;
