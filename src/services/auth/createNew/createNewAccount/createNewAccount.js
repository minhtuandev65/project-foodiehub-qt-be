import { authModels } from '~/models/auth'
import { WEBSITE_DOMAIN } from '~/utils/constants'
import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcryptjs'
import verifyEmailTemplate from '~/template/auth/verifyEmailTemplate'
import { ResendProvider } from '~/providers/ResendProvider'
export const createNewAccount = async (reqData) => {
    // Tạo mới một user
    const nameFromEmail = reqData.email.split('@')[0]
    const newUser = {
        email: reqData.email,
        password: await bcrypt.hash(reqData.password, 8),
        username: nameFromEmail,
        fullName: reqData.fullName,
        verifyToken: uuidv4()
    }
    const creatNewUser = await authModels.createNewAccount(newUser)

    const getProfileUser = await authModels.findAccountById(
        creatNewUser.insertedId
    )

    const verificationLink = `${WEBSITE_DOMAIN}/account/verification?email=${getProfileUser.email}&token=${getProfileUser.verifyToken}`
    const customSubject =
        'DineSpot system: Please verify your email before using our services!'
    const htmlContent = verifyEmailTemplate({
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
