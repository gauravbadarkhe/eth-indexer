const { MongoClient, ServerApiVersion } = require('mongodb');
const { default: Graceful } = require('node-graceful');

// Graceful.captureExceptions = false;



const connectionString = process.env.MONGO_URI || "";
const client =  new MongoClient(connectionString); 
let connection = null;

module.exports.connect = () => new Promise(async(resolve, reject) => {
    
    try {
        connection = (await client.connect()).db(process.env.MONGO_DB_NAME);
        resolve(connection);
    } catch (error) {
        reject(err);
    }
});

module.exports.getDB = () => {
    if(!connection) {
        throw new Error('Call connect first!');
    }

    return connection;
}

module.exports.closeDB = () => {
    if(!connection) {
        throw new Error('Call connect first!');
    }

    return client.close();
}