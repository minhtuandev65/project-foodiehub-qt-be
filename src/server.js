import express from 'express'
import cookieParser from 'cookie-parser'
import { CLOSE_DB, CONNECT_DB } from './config/mongodb'
import cors from 'cors'
import exitHook from 'async-exit-hook'
import { APIs_v1 } from './routes/v1'
import { errorHandlingMiddleware } from './middlewares/errorHandlingMiddleware'
import { env } from './config/environment'
import { corsOptions } from './config/cors'

const START_SERVER = () => {
    const app = express()

    app.use((req, res, next) => {
        res.set('Cache-Control', 'no-store')
        next()
    })

    app.use(cookieParser())

    app.use(express.json())
    app.use(cors(corsOptions))

    app.use('/v1', APIs_v1)

    app.use(errorHandlingMiddleware)

    const PORT = process.env.PORT || env.LOCAL_DEV_APP_PORT
    const HOST = process.env.PORT ? '0.0.0.0' : env.LOCAL_DEV_APP_HOST

    app.listen(PORT, HOST, () => {
        console.log(
            `${process.env.PORT ? '🚀 Production' : '🔧 Local DEV'}: Hi ${env.AUTHOR}, Back-end Server is running successfully at ${HOST}:${PORT}`
        )
    })

    exitHook(() => {
        console.log('4. Server is shutting down...')
        CLOSE_DB()
        console.log('5. Disconnected from MongoDB Cloud Atlas')
    })
}

;(async () => {
    try {
        console.log('1. Connecting to MongoDB Cloud Atlas...')

        await CONNECT_DB()

        console.log('2. Connected to MongoDB Cloud Atlas!')

        START_SERVER()
    } catch (error) {
        console.error(error)
        process.exit(0)
    }
})()
