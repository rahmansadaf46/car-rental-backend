const moment = require('moment');

exports.calculateDuration = (pickUpDate, returnDate) => {
    const pickUp = moment(pickUpDate);
    const returnD = moment(returnDate);
    const duration = moment.duration(returnD.diff(pickUp));

    const hours = duration.asHours();
    const days = duration.asDays();
    const weeks = duration.asWeeks();

    return { hours, days, weeks };
};
