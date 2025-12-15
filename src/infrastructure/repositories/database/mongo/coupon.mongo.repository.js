const CouponRepository = require("../../../../domain/repositories/coupon.repository.interfaces");
const CouponModel = require("./models/coupon.model");
const Coupon = require("../../../../domain/entities/coupon.entity");

class CouponMongoRepository extends CouponRepository {
  async getAll() {
    const coupons = await CouponModel.find();
    return coupons.map(
      (c) =>
        new Coupon(
          c._id.toString(),
          c.code,
          c.discountPercentage,
          c.validFrom,
          c.validUntil,
          c.isActive,
          c.createdAt,
          c.updatedAt
        )
    );
  }

  async getById(id) {
    const coupon = await CouponModel.findById(id);
    if (!coupon) return null;
    return new Coupon(
      coupon._id.toString(),
      coupon.code,
      coupon.discountPercentage,
      coupon.validFrom,
      coupon.validUntil,
      coupon.isActive,
    );
  }

  async getByCode(code) {
    const coupon = await CouponModel.findOne({ code });
    if (!coupon) return null;
    return new Coupon(
      coupon._id.toString(),
      coupon.code,
      coupon.discountPercentage,
      coupon.validFrom,
      coupon.validUntil,
      coupon.isActive,
    );
  }

  async create(couponEntity) {
    const newCoupon = new CouponModel({
      code: couponEntity.code,
      discountPercentage: couponEntity.discountPercentage,
      validFrom: couponEntity.validFrom,
      validUntil: couponEntity.validUntil,
      isActive: couponEntity.isActive,
    });
    const savedCoupon = await newCoupon.save();
    return new Coupon(
      savedCoupon._id.toString(),
      savedCoupon.code,
      savedCoupon.discountPercentage,
      savedCoupon.validFrom,
      savedCoupon.validUntil,
      savedCoupon.isActive,
    );
  }

  async update(id, couponEntity) {
    const updatedCoupon = await CouponModel.findByIdAndUpdate(
      id,
      {
        code: couponEntity.code,
        discountPercentage: couponEntity.discountPercentage,
        validFrom: couponEntity.validFrom,
        validUntil: couponEntity.validUntil,
        isActive: couponEntity.isActive,
      },
      { new: true }
    );

    if (!updatedCoupon) return null;
    return new Coupon(
      updatedCoupon._id.toString(),
      updatedCoupon.code,
      updatedCoupon.discountPercentage,
      updatedCoupon.validFrom,
      updatedCoupon.validUntil,
      updatedCoupon.isActive,
    );
  }

  async delete(id) {
    await CouponModel.findByIdAndDelete(id);
  }
}

module.exports = CouponMongoRepository;
