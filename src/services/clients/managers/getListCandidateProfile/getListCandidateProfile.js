import { restaurantModels } from '~/models/restaurant'
import { CloudStorageProvider } from '~/providers/cloudStorageProvider'

export const getListCandidateProfile = async (restaurantId) => {
    try {
        const result =
            await restaurantModels.getListCandidateProfile(restaurantId)
        const candidateProfiles = result.candidateProfiles || []

        const data = await Promise.all(
            candidateProfiles.map(async (profile) => {
                const userCvUrl = await CloudStorageProvider.getCvUrl(
                    profile.cvKeyS3
                )
                return { ...profile, userCvUrl }
            })
        )

        return data
    } catch (error) {
        throw Error(error)
    }
}
