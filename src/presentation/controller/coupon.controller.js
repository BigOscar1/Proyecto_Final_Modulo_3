class CouponController {
  constructor(couponService) { // Depende del Caso de Uso
    this.couponService = couponService;
  }

  getAll = async (req, res) => {
    const coupons = await this.couponService.getAllCoupons();
    res.status(200).json(coupons);
  };

  getById = async (req, res) => {
    const { id } = req.params;
    const coupon = await this.couponService.getCouponById(id);
    if (coupon) {
      res.status(200).json(coupon);
    } else {
      res.status(404).json({ message: "Coupon not found" });
    }
  };

  getByCode = async (req, res) => {
    const { code } = req.params;
    const coupon = await this.couponService.getCouponByCode(code);
    if (coupon) {
      res.status(200).json(coupon);
    } else {
      res.status(404).json({ message: "Coupon not found" });
    }
  };

  create = async (req, res) => {
    const coupon = await this.couponService.createCoupon(req.body);
    res.status(201).json(coupon); // 201 Created
  };

  update = async (req, res) => {
    const { id } = req.params;
    const coupon = await this.couponService.updateCoupon(id, req.body);
    if (coupon) {
      res.status(200).json(coupon);
    } else {
      res.status(404).json({ message: "Coupon not found" });
    }
  };

  delete = async (req, res) => {
    const { id } = req.params;
    await this.couponService.deleteCoupon(id);
    res.status(204).send(); // 204 No Content
  };
}

module.exports = CouponController;
