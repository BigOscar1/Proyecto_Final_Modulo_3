const Coupon = require("../../domain/entities/coupon.entity");

class CouponService {
  constructor(couponRepository) {
    this.couponRepository = couponRepository;
  }

  async getAllCoupons() {
    return await this.couponRepository.getAll();
  }

  async getCouponById(id) {
    return await this.couponRepository.getById(id);
  }

  async getCouponByCode(code) {
    return await this.couponRepository.getByCode(code);
  }

  async createCoupon(couponData) {
    const couponEntity = new Coupon(
      null,
      couponData.code,
      couponData.discountPercentage,
      couponData.validFrom,
      couponData.validUntil,
      couponData.isActive,
    );

    return await this.couponRepository.create(couponEntity);
  }

  async updateCoupon(id, couponData) {
    const couponEntity = new Coupon(
      id,
      couponData.code,
      couponData.discountPercentage,
      couponData.validFrom,
      couponData.validUntil,
      couponData.isActive,
      couponData.createdAt || new Date(),
      new Date() // updatedAt
    );

    return await this.couponRepository.update(id, couponEntity);
  }

  async deleteCoupon(id) {
    return await this.couponRepository.delete(id);
  }
}

module.exports = CouponService;
