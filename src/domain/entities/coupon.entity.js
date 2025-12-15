class Coupon {
  constructor(
    id,
    code,
    discountPercentage, // número entre 0 y 100
    validFrom,          // fecha inicio
    validUntil,         // fecha fin
    isActive,           // booleano
    createdAt,
    updatedAt
  ) {
    this.id = id;
    this.code = code;
    this.discountPercentage = discountPercentage;
    this.validFrom = validFrom;
    this.validUntil = validUntil;
    this.isActive = isActive;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

module.exports = Coupon;
