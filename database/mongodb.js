require('dotenv').config()

//connect to Atlas Mongo using .env variables
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.ATLAS_USER}:${process.env.ATLAS_PASSWORD}@${process.env.ATLAS_CLUSTER}`;
const dbName = `${process.env.DB_NAME}`

//backup connect to local mongo
// const uri = "mongodb://localhost:27017/volunteer_management_system";
// const dbName = "volunteer_management_system"

const Client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const Db = Client.db(dbName)

module.exports = {
    client: Client,
    db: Db,
    uri: uri,
    dbName: dbName,
}



