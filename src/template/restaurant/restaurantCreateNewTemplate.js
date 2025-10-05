import { APP_LOGO } from '~/utils/constants'

const restaurantCreateNewTemplate = ({ email, name }) => {
    return `
    <!doctype html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <title>Organization Form Submitted</title>
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
                    <img
                        src=${APP_LOGO}
                        alt="FoodieHub-qt Logo"
                    />
                </div>

                <!-- Content -->
                <div class="content">
                    <p>Hi <strong>${email}</strong>,</p>
                    <p>
                        Thank you for submitting the organization creation form
                        for <strong>${name}</strong>.
                    </p>
                    <p>
                        Our team has received your information and is currently
                        reviewing your request. Once approved, you'll be
                        notified and will be able to manage your organization's
                        profile and job postings on our platform.
                    </p>
                    <p>
                        If you have any questions during this process, feel free
                        to reach out to our support team at any time.
                    </p>
                </div>

                <!-- Footer -->
                <div class="footer">
                    <p>
                        Thank you for choosing our platform.<br />— The FoodieHub-qt
                        Team —
                    </p>
                </div>
            </div>
        </div>
    </body>
</html>

  `
}

export default restaurantCreateNewTemplate
