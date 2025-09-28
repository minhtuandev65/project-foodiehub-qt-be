import { organizationModels } from '~/models/organization'
import { CloudStorageProvider } from '~/providers/cloudStorageProvider'

export const getCandidateProfile = async (organizationId) => {
    try {
        const result =
            await organizationModels.getCandidateProfileForManager(
                organizationId
            )
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
