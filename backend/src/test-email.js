import { sendWelcomeEmail } from "./utils/email/email.service.js";
await sendWelcomeEmail({
  name: "vishu",
  email: "test123879654@mailinator.com",
  password: "Temp@123",
});


console.log("Email Sent Successfully");