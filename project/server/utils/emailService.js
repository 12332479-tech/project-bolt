/**
 * Mock Email Service
 * In a real application, this would use a provider like SendGrid, Nodemailer, or AWS SES.
 * For this project, we will simulate sending emails by logging to the console.
 */

const sendEmail = (to, subject, text) => {
  console.log('--- MOCK EMAIL SERVICE ---');
  console.log(`To: ${to}`);
  console.log(`Subject: ${subject}`);
  console.log(`Body: ${text}`);
  console.log('--------------------------');
  return Promise.resolve(true);
};

const sendBookingConfirmation = (user, booking, car) => {
  const subject = `Booking Confirmation - ${car.brand} ${car.name}`;
  const text = `
    Dear ${user.username},

    Thank you for booking with us!
    
    Car: ${car.brand} ${car.name}
    Dates: ${booking.startDate} to ${booking.endDate}
    Total Price: $${booking.totalPrice}
    
    We look forward to seeing you!
  `;
  return sendEmail(user.email, subject, text);
};

module.exports = {
  sendEmail,
  sendBookingConfirmation
};
