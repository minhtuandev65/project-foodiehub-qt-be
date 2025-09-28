import express from 'express'

import { candidateProfileRoute } from './candidateProfile/candidateProfileRoute'

const Router = express.Router()


Router.use('/candidateProfile', candidateProfileRoute)
export const usersRoute = Router
