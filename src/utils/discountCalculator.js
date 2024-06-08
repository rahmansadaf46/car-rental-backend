exports.calculateDiscount = (baseCharge, discount) => {
    if (!discount) return 0;
    return baseCharge * (discount / 100);
};
