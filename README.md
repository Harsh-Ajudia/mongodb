# Ril Commons - MongoDB

## Contents

1. [Connection](#mongo-connection)
2. [CRUD Operations](#mongo-crud-operations)

## Connection

To connect to the mongo database call connectToServer method and pass in uri and custom database options.

This will return 2 parameters status and message. If status is true that means you are connected.

```js
const { connections: mongoConn } = require('@ril-commons/mongodb')

const res = await mongoConn.connectToServer("mongodb://localhost", {})

console.log(res)
// { status: true, message: 'Connected MongoDB: my_db' }
```

__Re-use same connection elsewhere__

Once connected you get status flag. Now you can utilize the same connection anywhere in your node.js application.

To do so use **getDb()** function to get the connection.

```js
const { connections: mongoConn } = require('@ril-commons/mongodb')

const connectionObj = mongoConn.getDb()
// further use connectionObj to run any query
```

__Close database connection on app shutdown__

This is important part of the connection. Use closeConnections() method if there is no requirement of using mysql connection or during graceful shutdown

```js
const { connections: mongoConn } = require('@ril-commons/mongodb')

mongoConn.closeConnections()
```

## Crud Operations

__Running Simple query__

To run a query against the given database use runQuery() method of mysqlCrud

- **collection:** This can be your collection name which can be passed in the form of string
- **query:** This is an object which is used to narrow down the collection data
- **projection:** In order to get only the required fields in response the projection object can be passed

```js
const { crud } = require('@ril-commons/mongodb')

const findRes = await crud.find(collection, query, projection, options)
// options: To customize the documents options is used. Currently the below options are supported
// const options = { limit: 10, page: 1, sort: "firstName", order: "asc" | "desc" }

```
```js
const findOneRes = await crud.findOne(collection, query, projection)
```
```js
const insertOneRes = await crud.insertOne(collection, data)
// data: The data is a document you want to store in the given collection
```
```js
const updateOneRes = await crud.updateOne(collection, query, set)
// set: pass in set object that you want to update in the existing document
// The parameters that are passed in the set value will be updated
```
```js
const deleteOneRes = await crud.deleteOne(collection, query)
```