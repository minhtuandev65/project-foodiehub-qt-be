// import { StatusCodes } from 'http-status-codes'
// import { authModels } from '~/models/auth'
// import { CloudStorageProvider } from '~/providers/cloudStorageProvider'
// import ApiError from '~/utils/ApiError'

// export const updateProfile = async (reqBody) => {
//     try {
//         const existUser = await authModels.findAccountById(reqBody.userId)

//         if (!existUser)
//             throw new ApiError(StatusCodes.NOT_FOUND, 'Account not found!')

//         if (!existUser.isActive)
//             throw new ApiError(
//                 StatusCodes.NOT_ACCEPTABLE,
//                 'Please active your account first!'
//             )

//         let result = {}

//         if (reqBody.userAvatarFile) {
//             const uploadResult = await CloudStorageProvider.streamUpload(
//                 reqBody.userAvatarFile.buffer,
//                 USER_COLLECTION_NAME
//             )
//             const updatedData = {
//                 ...reqBody.body,
//                 avatar: uploadResult.secure_url
//             }
//             result = await authModel.update(existUser._id, updatedData)
//         } else {
//             const updatedData = reqBody.body
//             result = await authModel.update(existUser._id, updatedData)
//         }
//         return result
//     } catch (error) {
//         throw Error(error)
//     }
// }
