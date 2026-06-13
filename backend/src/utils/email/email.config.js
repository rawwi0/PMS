import nodemailer from "nodemailer";
import { env } from "../../config/env.js";

 export const transporter = nodemailer.createTransport({
  host: env.MAILTRAP_HOST,
  port: Number(env.MAILTRAP_PORT),
  secure: false,
  auth: {
    user: env.MAILTRAP_USER,
    pass: env.MAILTRAP_PASS,
  },
});