import { StatusCodes } from 'http-status-codes'
import { menuServices } from '~/services/clients/managers/menu'
import ApiError from '~/utils/ApiError'

export const updateMenu = async (req, res) => {
    try {
        const { t } = req
        const menuId = req.params.menuId
        const userId = req.payload._id
        const imageURL = req.file
        const menuData = {
            ...req.body,
            userId,
            menuId,
            imageURL
        }

        const data = await menuServices.updateMenu(menuData, t)

        res.status(StatusCodes.OK).json({
            status: t('success'),
            message: t('managers.updateMenuSuccessfully', {
                name: data.name
            }),
            data
        })
    } catch (error) {
        const { t } = req
        if (error instanceof ApiError) {
            res.status(error.statusCode).json({
                status: t('error'),
                message: error.message // message trong ApiError có thể cũng dùng i18n
            })
        } else {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                status: t('error'),
                message: error.message || 'Internal Server Error'
            })
        }
    }
}
