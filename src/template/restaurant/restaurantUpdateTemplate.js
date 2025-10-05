import { APP_LOGO } from '~/utils/constants'

const restaurantUpdateTemplate = ({ email, name, isOwner }) => {
    return `
    <!doctype html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <title>Restaurant Update Notification</title>
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
                background-color: #eb6118;
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
            .content h2 {
                color: $ {
                    isowner? '#2e7d32' : '#c62828';
                }
                margin-top: 0;
            }
            .highlight {
                font-weight: bold;
                color: #333;
            }
            .footer {
                background-color: #fafafa;
                padding: 20px;
                text-align: center;
                font-size: 13px;
                color: #777777;
            }
            a {
                color: #eb6118;
                text-decoration: none;
            }
        </style>
    </head>
    <body>
        <div class="email-wrapper">
            <div class="container">
                <!-- Header -->
                <div class="header">
                    <img src="${APP_LOGO}" alt="FoodieHub-qt Logo" />
                </div>

                <!-- Content -->
                <div class="content">
                    <h2>
                        ${
                            isOwner
                                ? 'Your Restaurant Has Been Updated'
                                : 'Restaurant Update Attempt Detected'
                        }
                    </h2>
                    <p>Hi ${email},</p>

                    ${
                        isOwner
                            ? `
                    <p>
                        The information of your Restaurant
                        <span class="highlight">${name}</span> has been
                        successfully updated.
                    </p>
                    <p>
                        If you didn’t make this change, please contact our
                        support immediately.
                    </p>
                    `
                            : `
                    <p>
                        Someone has attempted to update the Restaurant
                        <span class="highlight">${name}</span>, but they are not
                        the registered owner.
                    </p>
                    <p>
                        If this is a mistake or you believe your Restaurant’s
                        information has been modified without your permission,
                        please contact our admin team at
                        <a href="mailto:admin@foodiehub-qt.uk"
                            >admin@foodiehub-qt.uk</a
                        >.
                    </p>
                    `
                    }
                </div>

                <!-- Footer -->
                <div class="footer">
                    <p>
                        Thank you for using our platform.<br />— The
                        FoodieHub-qt Team —
                    </p>
                </div>
            </div>
        </div>
    </body>
</html>

  `
}

export default restaurantUpdateTemplate
