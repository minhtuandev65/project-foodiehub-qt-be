import { restaurantModels } from '~/models/restaurant'
// import { CloudStorageProvider } from '~/providers/cloudStorageProvider'

export const getListCandidateProfile = async (restaurantId) => {
    try {
        const result =
            await restaurantModels.getListCandidateProfile(restaurantId)
        // const candidateProfiles = result.candidateProfiles || []

        // const data = await Promise.all(
        //     candidateProfiles.map(async (profile) => {
        //         const userCvUrl = await CloudStorageProvider.getUrlS3(
        //             profile.cvKeyS3
        //         )
        //         return { ...profile, userCvUrl }
        //     })
        // )
        // const candidateProfileList = result.restaurantList.map((item) => ({
        //     ...item,
        //     createdAt: new Date(item.createdAt).toLocaleDateString('vi-VN')
        // }))
        return result
    } catch (error) {
        throw Error(error)
    }
}
