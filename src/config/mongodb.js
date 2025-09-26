const { env } = require('./environment')
const { MongoClient, ServerApiVersion } = require('mongodb')

let jobSeekDatabaseInstance = null

const mongoClientInstance = new MongoClient(env.MONGODB_URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: false,
        deprecationErrors: true
    }
})

export const CONNECT_DB = async () => {
    try {
        await mongoClientInstance.connect()
        jobSeekDatabaseInstance = mongoClientInstance.db(env.DATABASE_NAME)

        // Tạo text index cho full-text search
        await jobSeekDatabaseInstance.collection('users').createIndex(
            {
                title: 'text',
                description: 'text',
                location: 'text'
            },
            { name: 'TextIndexForSearch' }
        )

        console.log('✅ MongoDB connected successfully')
    } catch (error) {
        console.error('❌ MongoDB connection failed:', error)
        process.exit(1)
    }
}

export const CLOSE_DB = async () => {
    await mongoClientInstance.close()
}

export const GET_DB = () => {
    if (!jobSeekDatabaseInstance) {
        throw new Error('❌ Must connect to MongoDB first.')
    }
    return jobSeekDatabaseInstance
}
