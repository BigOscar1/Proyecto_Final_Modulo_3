class Order {
  constructor(
    id,
    customerName,
    items,
    total,
    paymentType,
    coupon,
    createdAt,
    updatedAt
  ) {
    this.id = id; 
    this.customerName = customerName;
    this.items = items.map((item) => ({
      productId: item.productId, 
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      subtotal: item.subtotal,
    }));
    this.total = total;
    this.paymentType = paymentType;
    // this.coupon = coupon;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

module.exports = Order;
