import { createNewStaff } from "./createNewStaff/createNewStaff";
import { findStaffByEmail } from "./findStaffByEmail/findStaffByEmail";
import { findStaffById } from "./findStaffById/findStaffById";
import { updateStaff } from "./update/updateStaff/updateStaff";

export const staffModels = {
    createNewStaff,
    findStaffById,
    findStaffByEmail,
    updateStaff
}