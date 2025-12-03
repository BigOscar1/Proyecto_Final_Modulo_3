const OrderRepository = require("../../../../domain/repositories/order.repository.interface");
const OrderModel = require("./models/order.model");
const Order = require("../../../../domain/entities/order.entity");

class OrderMongoRepository extends OrderRepository {
  async getAll() {
    const orders = await OrderModel.find().populate("items.productId", "_id imageUrl");
    return orders.map(
      (o) =>
        new Order(
          o._id.toString(),
          o.customerName,
          o.items.map((item) => ({
            productId: item.productId?.toString(),
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            subtotal: item.subtotal,
          })),
          o.total,
          o.paymentType,
          o.createdAt,
          o.updatedAt
        )
    );
  }

  async getById(id) {
    const order = await OrderModel.findById(id).populate("items.productId");
    if (!order) return null;
    return new Order(
      order._id.toString(),
      order.customerName,
      order.items.map((item) => ({
        productId: item.productId?.toString(),
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        subtotal: item.subtotal,
      })),
      order.total,
      order.paymentType,
      order.createdAt,
      order.updatedAt
    );
  }

  async create(orderEntity) {
    const newOrder = new OrderModel({
      customerName: orderEntity.customerName,
      items: orderEntity.items.map((item) => ({
        productId: item.productId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        subtotal: item.subtotal,
      })),
      total: orderEntity.total,
      paymentType: orderEntity.paymentType,
    });

    const savedOrder = await newOrder.save();
    return new Order(
      savedOrder._id.toString(),
      savedOrder.customerName,
      savedOrder.items.map((item) => ({
        productId: item.productId?.toString(),
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        subtotal: item.subtotal,
      })),
      savedOrder.total,
      savedOrder.paymentType,
      savedOrder.createdAt,
      savedOrder.updatedAt
    );
  }

  async update(id, orderEntity) {
    const updatedOrder = await OrderModel.findByIdAndUpdate(
      id,
      {
        customerName: orderEntity.customerName,
        items: orderEntity.items.map((item) => ({
          productId: item.productId,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          subtotal: item.subtotal,
        })),
        total: orderEntity.total,
        paymentType: orderEntity.paymentType,
      },
      { new: true }
    );

    if (!updatedOrder) return null;
    return new Order(
      updatedOrder._id.toString(),
      updatedOrder.customerName,
      updatedOrder.items.map((item) => ({
        productId: item.productId?.toString(),
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        subtotal: item.subtotal,
      })),
      updatedOrder.total,
      updatedOrder.paymentType,
      updatedOrder.createdAt,
      updatedOrder.updatedAt
    );
  }

  async delete(id) {
    await OrderModel.findByIdAndDelete(id);
  }
}

module.exports = OrderMongoRepository;
