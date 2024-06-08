const { calculateDiscount } = require('../utils/discountCalculator');
const { calculateDuration } = require('../utils/dateUtils');

exports.calculateTotal = ({ pickUpDate, returnDate, discount, vehicle, collisionDamageWaiver, liabilityInsurance, rentalTax }) => {
    const { hours, days, weeks } = calculateDuration(pickUpDate, returnDate);
    const { hourly, daily, weekly } = vehicle.rates;

    let baseCharge = 0;
    let breakdown = [];

    if (weeks >= 1) {
        const weeklyCharge = Math.floor(weeks) * weekly;
        baseCharge += weeklyCharge;
        breakdown.push({ charge: 'Weekly', unit: Math.floor(weeks), rate: weekly, total: weeklyCharge });
    }

    const remainingDays = days % 7;
    if (remainingDays >= 1) {
        const dailyCharge = Math.floor(remainingDays) * daily;
        baseCharge += dailyCharge;
        breakdown.push({ charge: 'Daily', unit: Math.floor(remainingDays), rate: daily, total: dailyCharge });
    }

    if (hours > 0 && days < 1) {
        const hourlyCharge = Math.ceil(hours) * hourly;
        baseCharge += hourlyCharge;
        breakdown.push({ charge: 'Hourly', unit: Math.ceil(hours), rate: hourly, total: hourlyCharge });
    }

    const discountAmount = calculateDiscount(baseCharge, discount);
    let total = baseCharge - discountAmount;
    if (discountAmount !== 0) {
        breakdown.push({ charge: 'Discount', unit: 1, rate: -discountAmount, total: -discountAmount });
    }

    if (collisionDamageWaiver) {
        total += 9;
        breakdown.push({ charge: 'Collision Damage Waiver', unit: 1, rate: 9, total: 9 });
    }

    if (liabilityInsurance) {
        total += 15;
        breakdown.push({ charge: 'Liability Insurance', unit: 1, rate: 15, total: 15 });
    }

    if (rentalTax) {
        const taxAmount = total * 0.1;
        total += taxAmount;
        breakdown.push({ charge: 'Rental Tax', unit: 1, rate: taxAmount, total: taxAmount });
    }

    if(total < 0){
        total = 0;
    }

    return { total, breakdown };
};
