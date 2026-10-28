import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const { META_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465, // ещё бывают 25, 465, 2525
  secure: true,
  auth: {
    user: "vasyakurolesov_go@meta.ua",
    pass: META_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const email = {
  to: "yaraj85204@hiringview.com",
  from: "vasyakurolesov_go@meta.ua",
  subject: "Test email",
  html: "<p><strong>Test email</strong> from localhost:3000</p>",
};

transport
  .sendMail(email)
  .then(() => console.log("Email send success"))
  .catch((error) => console.log(error.message));
