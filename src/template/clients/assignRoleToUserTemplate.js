import { APP_LOGO } from '~/utils/constants'

const assignRoleToUserTemplate = ({ email }) => {
    return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Congratulations - Manager Role</title>
  </head>
  <body
    style="
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
      font-family: Arial, sans-serif;
    "
  >
    <table
      align="center"
      width="100%"
      cellpadding="0"
      cellspacing="0"
      style="background-color: #f4f4f4; padding: 20px 0"
    >
      <tr>
        <td align="center">
          <table
            cellpadding="0"
            cellspacing="0"
            width="600"
            style="
              background: #ffffff;
              border-radius: 10px;
              overflow: hidden;
              box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            "
          >
            <!-- Header -->
            <tr>
              <td
                style="
                  background: #EB6118;
                  padding: 30px;
                  text-align: center;
                "
              >
                <img
                  src="${APP_LOGO}"
                  alt="FoodieHub-qt Logo"
                  style="max-width: 180px; height: auto; display: inline-block;"
                />
              </td>
            </tr>

            <!-- Main Content -->
            <tr>
              <td
                style="
                  padding: 30px;
                  text-align: left;
                  color: #333333;
                  font-size: 16px;
                  line-height: 1.6;
                "
              >
                <p>Dear <strong>${email}</strong>,</p>
                <p>
                  We are pleased to extend our congratulations to you as our
                  team has checked the information and has verified it.
                </p>
                <p>
                  Therefore, we will give you the benefits of an
                  <b>MANAGER</b> on our website.
                </p>
                <p>
                  May your days be filled with <strong>happiness</strong>,
                  <strong>good health</strong>, and <strong>success</strong>.
                  Thank you for being a part of our journey! 💖
                </p>
                <p style="margin-top: 20px">
                  — The <strong>FoodieHub-qt Team</strong>
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td
                style="
                  background-color: #fafafa;
                  padding: 20px;
                  text-align: center;
                  font-size: 13px;
                  color: #777;
                "
              >
                <p>
                  &copy; 2025 FoodieHub-qt Company. All rights reserved.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>

`
}

export default assignRoleToUserTemplate
