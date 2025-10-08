import { StatusCodes } from "http-status-codes"
import { menuServices } from "~/services/clients/managers/menu"
import ApiError from "~/utils/ApiError"

export const createNewMenu = async (req, res) => {
    try {
        const { t } = req
        const userId = req.payload._id
        const restaurantId = req.params.restaurantId
        const files = JSON.parse(JSON.stringify(req.files))
        const imageURL = files.imageURL?.[0]

        const newMenuData = {
            userId,
            restaurantId,
            imageURL,
            ...req.body
        }

        const data =
            await menuServices.createNewMenu(newMenuData)

        res.status(StatusCodes.CREATED).json({
            status: 'success',
            message: t('managers.createNewMenuSuccessfully', {
                name: data.name
            }),
            data
        })
    } catch (error) {
        const { t } = req
        if (error instanceof ApiError) {
            res.status(error.statusCode).json({
                status: 'error',
                message: error.message // message trong ApiError có thể cũng dùng i18n
            })
        } else {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                status: 'error',
                message: error.message || 'Internal Server Error'
            })
        }
    }
}