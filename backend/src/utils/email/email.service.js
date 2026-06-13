import { transporter } from "./email.config.js";
import { welcomeTemplate } from "./templates/welcome.template.js";

export const sendWelcomeEmail = async ({
  name,
  email,
  password,
}) => {
  await transporter.sendMail({
    from: "battlebaybackup0@gmail.com",
    to: email,
    subject: "Welcome to ProjectFlow",
    html: welcomeTemplate({
      name,
      email,
      password,
    }),
  });
};