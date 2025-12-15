class CouponRepository {
  constructor() {
    if (this.constructor === CouponRepository) {
      throw new Error("Cannot instantiate abstract class");
    }
  }

  async getAll() {
    throw new Error("Method 'getAll()' must be implemented.");
  }

  async getById(id) {
    throw new Error("Method 'getById(id)' must be implemented.");
  }

  async getByCode(code) {
    throw new Error("Method 'getByCode(code)' must be implemented.");
  }

  async create(coupon) {
    throw new Error("Method 'create(coupon)' must be implemented.");
  }

  async update(id, coupon) {
    throw new Error("Method 'update(id, coupon)' must be implemented.");
  }

  async delete(id) {
    throw new Error("Method 'delete(id)' must be implemented.");
  }
}

module.exports = CouponRepository;
