// utils/mailTemplates/forgotPasswordTemplate.js

const forgotPasswordTemplate = ({
    APP_LOGO,
    confirmationLink,
    FORGOT_PASSWORD_TOKEN_LIFE,
    year
}) => {
    return `
    <!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Forgot Password</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
      }
      .email-wrapper {
        width: 100%;
        padding: 20px 0;
        background-color: #f4f4f4;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        background-color: #ffffff;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      }
      .header {
        background-color: #EB6118;
        padding: 30px;
        text-align: center;
      }
      .header img {
        max-width: 180px;
        height: auto;
        display: inline-block;
      }
      .content {
        padding: 30px;
        color: #333333;
        font-size: 16px;
        line-height: 1.6;
      }
      .content p {
        margin: 0 0 15px;
      }
      .content a.button {
        display: inline-block;
        background-color: #000000;
        color: #ffffff;
        padding: 12px 24px;
        text-decoration: none;
        border-radius: 5px;
        font-weight: bold;
        margin: 20px 0;
      }
      .footer {
        background-color: #fafafa;
        padding: 20px;
        text-align: center;
        font-size: 13px;
        color: #777777;
      }
    </style>
  </head>
  <body>
    <div class="email-wrapper">
      <div class="container">
        <!-- Header -->
        <div class="header">
          <img src=${APP_LOGO} alt="FoodieHub-qt Logo" />
        </div>

        <!-- Content -->
        <div class="content">
          <h2>Reset Your Password</h2>
          <p>We received a request to reset your password. Click the button below to set a new one.</p>

          <p style="text-align: center">
            <a href="${confirmationLink}" class="button">Reset Password</a>
          </p>

          <p>If you didn’t request a password reset, you can safely ignore this email.</p>
          <p>This link will expire in <strong>${FORGOT_PASSWORD_TOKEN_LIFE}</strong> minutes.</p>
        </div>

        <!-- Footer -->
        <div class="footer">
          <p>&copy; ${year} Daily Sleep Tracker. All rights reserved.</p>
        </div>
      </div>
    </div>
  </body>
</html>

  `
}

export default forgotPasswordTemplate
