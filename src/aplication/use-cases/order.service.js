// application/services/order.service.js
const Order = require("../../domain/entities/order.entity");

class OrderService {
  constructor(orderRepository) {
    this.orderRepository = orderRepository;
  }

  async getAllOrders() {
    return await this.orderRepository.getAll();
  }

  async getOrderById(id) {
    return await this.orderRepository.getById(id);
  }

  async createOrder(orderData) {
    let total = 0;
    // Calcular subtotales y total
    orderData.items.forEach((item) => {
      item.subtotal = item.price * item.quantity;
    });

    orderData.items.forEach((item) => {
      item.subtotal = item.price * item.quantity;
      total += item.subtotal;
    });

    orderData.total = total;

    const orderEntity = new Order(
      null,
      orderData.customerName,
      orderData.items,
      orderData.total,
      orderData.paymentType
    );

    return await this.orderRepository.create(orderEntity);
  }

  async updateOrder(id, orderData) {
    let total = 0;
    // Recalcular subtotales y total
    orderData.items.forEach((item) => {
      item.subtotal = item.price * item.quantity;
    });

    orderData.items.forEach((item) => {
      item.subtotal = item.price * item.quantity;
      total += item.subtotal;
    });
    orderData.total = total;

    const orderEntity = new Order(
      id,
      orderData.customerName,
      orderData.items,
      orderData.total,
      orderData.paymentType
    );

    return await this.orderRepository.update(id, orderEntity);
  }

  async deleteOrder(id) {
    return await this.orderRepository.delete(id);
  }
}

module.exports = OrderService;
