const { getDb: connection } = require('./mongo')

const find = (collection = "", query = {}, projection = {}, options = {}) => {
    //options may include 1 field sort, limit and page as of this version
    const combine = {
        projection
    }

    if (options.limit) {
        const page = Math.abs(options.page ? options.page : 1)
        combine.skip = (page - 1) * options.limit
    }
    if (options.sort) {
        combine.sort = { [options.sort]: options.order == 'desc' ? -1 : 1 }
    }
    const gotConn = getCollection(collection)
    if (gotConn) {
        return gotConn.find(query, combine).toArray();
    } else {
        throw new Error('Connection has been lost to Mongo.');
    }
}
const findOne = (collection = "", query = {}, projection = {}) => {
    const gotConn = getCollection(collection)
    if (gotConn) {
        return gotConn.findOne(query, projection)
    } else {
        throw new Error('Connection has been lost to Mongo.');
    }
}

const aggregate = (collection = "", pipeline = {}) => {
    const gotConn = getCollection(collection)
    if (gotConn) {
        return gotConn.aggregate(pipeline).toArray();
    } else {
        throw new Error('Connection has been lost to Mongo.');
    }
}

const insertOne = (collection, data) => {
    const gotConn = getCollection(collection)
    if (gotConn) {
        return gotConn.insertOne(data)
    } else {
        throw new Error('Connection has been lost to Mongo.');
    }
}
const insertMany = (collection, data) => {
    const gotConn = getCollection(collection)
    if (gotConn) {
        return gotConn.insertMany(data)
    } else {
        throw new Error('Connection has been lost to Mongo.');
    }
}

const updateOne = (collection = "", query = {}, setData = {}) => {
    const gotConn = getCollection(collection)
    if (gotConn) {
        return gotConn.updateOne(query, { $set: setData });
    } else {
        throw new Error('Connection has been lost to Mongo.');
    }
}

const updateMany = (collection = "", query = {}, setData = {}) => {
    const gotConn = getCollection(collection)
    if (gotConn) {
        return gotConn.updateMany(query, { $set: setData });
    } else {
        throw new Error('Connection has been lost to Mongo.');
    }
}

const deleteOne = (collection = "", query = {}) => {
    const gotConn = getCollection(collection)
    if (gotConn) {
        return gotConn.deleteOne(query);
    } else {
        throw new Error('Connection has been lost to Mongo.');
    }
}

const deleteMany = (collection = "", query = {}) => {
    const gotConn = getCollection(collection)
    if (gotConn) {
        return gotConn.deleteMany(query);
    } else {
        throw new Error('Connection has been lost to Mongo.');
    }
}

const getCollection = (collection = "") => {
    return connection().collection(collection);
}

module.exports = {
    findOne,
    find,
    aggregate,
    insertOne,
    insertMany,
    updateOne,
    updateMany,
    deleteOne,
    deleteMany
}