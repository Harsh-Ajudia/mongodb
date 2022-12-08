const { MongoClient } = require('mongodb')

const options = {
    useNewUrlParser: true,
    connectTimeoutMS: 60000,
    useUnifiedTopology: true
}

let client
let database

module.exports.connectToServer = async (uri, customOptions) => {
    client = new MongoClient(uri, {
        ...options,
        ...customOptions
    })
    await client.connect()
    database = client.db().databaseName
    return { status: true, message: `Connected to Mongo: ${database}` }
}

module.exports.getDb = () => {
    return client.db()
}

module.exports.closeConnections = () => {
    return client.close()
}