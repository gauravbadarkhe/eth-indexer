import { MongoClient, ServerApiVersion } from "mongodb";
import Graceful from "node-graceful";

// Graceful.captureExceptions = false;
const connectionString = process.env.MONGO;

const client = new MongoClient(connectionString);
let _instance, connection;

export const COLLECTIONS = {
  BLOCKS: "blocks",
  TRANSACTIONS: "transactions",
  MAIN_DB: "eth_indexer",
};

export function connectMongoDB() {
  return new Promise(async (resolve, reject) => {
    try {
      _instance = await client.connect();
      connection = _instance.db(COLLECTIONS.MAIN_DB);
      console.log("Mongo DB Connected.");
      resolve(connection);
    } catch (error) {
      console.error("Erro Connection Mongo Db", error);
      reject(error);
    }
  });
}

export async function closeDB() {
  if (!connection) {
    throw new Error("Call connect first!");
  }
  return await client.close();
}

Graceful.on("exit", async () => {
  console.log(`Gracefully Closed Mongo DB Instance.`);
  await closeDB();
});

export default function mongo_instance() {
  if (!connection) {
    throw new Error("Call connect method first!!");
  }
  return connection;
}

export async function getFromCollection(
  collectionName,
  {
    sortColumn,
    sortDirection,
    pageLength,
    pageNumber,
    projection = [],
    filterObj,
  }
) {
  let query = mongo_instance().collection(collectionName).find(filterObj);

  if (projection) {
    let projectionObj = {};
    projection.forEach((key) => (projectionObj[key] = 1));
    query = query.project(projectionObj);
  }

  if (sortColumn) {
    query = query.sort({ [sortColumn]: sortDirection });
  }

  if (pageLength && pageNumber >= 0) {
    query = query.skip(pageLength * pageNumber).limit(parseInt(pageLength));
  }

  let result = await query.toArray();

  return result;
}

export async function insertOne(collectionName, object) {
  let collection = await mongo_instance().collection(collectionName);
  let result = await collection.insertOne(object);
  console.log(`Added One Entry (${result.insertedId} --> ${collectionName})`);
  object["insertedId"] = result.insertedId;
  return object;
}

export async function insertMany(collectionName, objects) {
  let collection = await mongo_instance().collection(collectionName);
  let result = await collection.insertOne(object);
  console.log(
    `Added Muiltiple Entries (${result.insertedId} --> ${collectionName})`
  );
}
