import { subscribeToQueue } from "./rabbit.js";
import sendEmail from "../utils/email.js";

export const initNotificationConsumer = () => {
  // ✅ USER CREATED
  subscribeToQueue("user_created", async (data) => {
    const { email, firstName, lastName } = data;

    const template = `
<!doctype html>
<html>
  <head>
    <style>
      body { font-family: "Segoe UI", sans-serif; color: #333; }
      .container { max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px; }
      .header { background: #4f46e5; color: white; padding: 20px; text-align: center; }
      .content { padding: 20px; }
      .footer { text-align: center; font-size: 12px; color: #777; padding: 10px; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Welcome to NeuroBank</h1>
      </div>
      <div class="content">
        <p>Hello ${firstName} ${lastName},</p>
        <p>Your account has been created successfully.</p>
        <p>We are happy to have you onboard.</p>
      </div>
      <div class="footer">© 2026 NeuroBank</div>
    </div>
  </body>
</html>
    `;

    await sendEmail(email, "Welcome to NeuroBank", "", template);
  });

  // ✅ USER CREDITED
  subscribeToQueue("user_credited", async (data) => {
    const { email, firstName, amount, fromAccount, dateTime, transactionId } =
      data;

    const template = `
<!doctype html>
<html>
  <head>
    <style>
      body { font-family: "Segoe UI", sans-serif; color: #333; }
      .container { max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px; }
      .header { background: #16a34a; color: white; padding: 20px; text-align: center; }
      .content { padding: 20px; }
      .box { background: #f3f4f6; padding: 15px; border-radius: 5px; }
      .footer { text-align: center; font-size: 12px; color: #777; padding: 10px; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Amount Credited</h1>
      </div>
      <div class="content">
        <p>Hello ${firstName},</p>
        <p>Your account has been credited.</p>
        <div class="box">
          <p><strong>Amount:</strong> ${amount}</p>
          <p><strong>From:</strong> ${fromAccount}</p>
          <p><strong>Date:</strong> ${dateTime}</p>
          <p><strong>Transaction ID:</strong> ${transactionId}</p>
        </div>
      </div>
      <div class="footer">© 2026 NeuroBank</div>
    </div>
  </body>
</html>
    `;

    await sendEmail(email, "Amount Credited", "", template);
  });

  // ✅ USER DEBITED
  subscribeToQueue("user_debited", async (data) => {
    const { email, firstName, amount, toAccount, dateTime, transactionId } =
      data;

    const template = `
<!doctype html>
<html>
  <head>
    <style>
      body { font-family: "Segoe UI", sans-serif; color: #333; }
      .container { max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px; }
      .header { background: #dc2626; color: white; padding: 20px; text-align: center; }
      .content { padding: 20px; }
      .box { background: #f3f4f6; padding: 15px; border-radius: 5px; }
      .footer { text-align: center; font-size: 12px; color: #777; padding: 10px; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Amount Debited</h1>
      </div>
      <div class="content">
        <p>Hello ${firstName},</p>
        <p>Your account has been debited.</p>
        <div class="box">
          <p><strong>Amount:</strong> ${amount}</p>
          <p><strong>To:</strong> ${toAccount}</p>
          <p><strong>Date:</strong> ${dateTime}</p>
          <p><strong>Transaction ID:</strong> ${transactionId}</p>
        </div>
        <p>If this was not you, contact support immediately.</p>
      </div>
      <div class="footer">© 2026 NeuroBank</div>
    </div>
  </body>
</html>
    `;

    await sendEmail(email, "Amount Debited", "", template);
  });
};

export default initNotificationConsumer;
