import { WEBSITE_DOMAIN } from '~/utils/constants'
import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcryptjs'
import { ResendProvider } from '~/providers/ResendProvider'
import { models } from '~/models'
import { templates } from '~/template'
export const createNewAccount = async (reqData) => {
    // Tạo mới một user
    const nameFromEmail = reqData.email.split('@')[0]
    const fullName = `${reqData.firstName} ${reqData.lastName}`.trim()
    const newUser = {
        email: reqData.email,
        password: await bcrypt.hash(reqData.password, 8),
        username: nameFromEmail,
        firstName: reqData.firstName,
        lastName: reqData.lastName,
        fullName: fullName,
        verifyToken: uuidv4()
    }
    const creatNewUser = await models.auth.create.createNewAccount(newUser)

    const getProfileUser = await models.auth.find.accountById(
        creatNewUser.insertedId
    )

    const verificationLink = `${WEBSITE_DOMAIN}/account/verification?email=${getProfileUser.email}&token=${getProfileUser.verifyToken}`
    const customSubject =
        'DineSpot system: Please verify your email before using our services!'
    const htmlContent = templates.auth.verifyEmailTemplate({
        fullName: getProfileUser.fullName,
        verificationLink: verificationLink
    })

    await ResendProvider.sendMail(
        getProfileUser.email,
        customSubject,
        htmlContent
    )
    return getProfileUser
}
