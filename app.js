import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

dotenv.config();

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const email = {
  to: "yaraj85204@hiringview.com",
  from: "kiskanevd@gmail.com",
  subject: "Test email",
  html: "<p><strong>Test email</strong> from localhost:3000</p>",
};

sgMail
  .send(email)
  .then(() => console.log("Email send success"))
  .catch((error) => console.log(error.message));
