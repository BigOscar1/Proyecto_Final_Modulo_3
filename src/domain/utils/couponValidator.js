async function validateAndApplyCoupon(couponRepository, couponCode, total) {
  let appliedCouponId = null;
  let couponIsValid = false;
  let couponValidationMessage = null;
  let couponCodeUsed = null;

  if (couponCode) {
    couponCodeUsed = couponCode;
    const coupon = await couponRepository.getByCode(couponCode);

    if (!coupon) {
      couponIsValid = false;
      couponValidationMessage = "El cupón no existe";
    } else if (!coupon.isActive) {
      couponIsValid = false;
      couponValidationMessage = "El cupón está inactivo";
    } else {
      const now = new Date();
      if (now < coupon.validFrom) {
        couponIsValid = false;
        couponValidationMessage = "El cupón aún no es válido";
      } else if (now > coupon.validUntil) {
        couponIsValid = false;
        couponValidationMessage = "El cupón ha expirado";
      } else {
        couponIsValid = true;
        couponValidationMessage = "Cupón válido";
        const discountAmount = (total * coupon.discountPercentage) / 100;
        total -= discountAmount;
        appliedCouponId = coupon._id;
      }
    }
  } else {
    couponIsValid = false;
    couponValidationMessage = "No se aplicó ningún cupón";
  }

  return {
    total,
    appliedCouponId,
    couponIsValid,
    couponValidationMessage,
    couponCodeUsed,
  };
}

module.exports = { validateAndApplyCoupon };
