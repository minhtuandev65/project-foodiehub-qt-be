import { createNewOrganization } from './createNewOrganization/createNewOrganization'
import { createNewStaffFOrOrganization } from './createNewStaffForOrganization/createNewStaffForOrganization'
import { findOrganizationById } from './findOrganizationById/findOrganizationById'
import { ORGANIZATION_COLLECTION_SCHEMA } from './organizationModel/organizationModel'
import { updateOrganization } from './update/updateOrganization/updateOrganization'
import { validateBeforeCreateOrganization } from './validateBeforeCreateOrganization/validateBeforeCreateOrganization'

export const organizationModels = {
    ORGANIZATION_COLLECTION_SCHEMA,
    validateBeforeCreateOrganization,
    createNewOrganization,
    createNewStaffFOrOrganization,
    findOrganizationById,
    updateOrganization
}
