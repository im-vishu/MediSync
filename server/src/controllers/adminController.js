import { sendMail } from '../utils/email.js';

// After updating doctor approval in DB
await sendMail({
  to: doctor.user.email,
  subject: "MediSync Doctor Approval",
  text: approved
    ? `Congratulations, your profile is approved.`
    : `Sorry, your application was rejected.`
});