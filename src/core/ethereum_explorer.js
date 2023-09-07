import { ObjectId } from "mongodb/lib/bson.js";
import mongo_instance, {
  COLLECTIONS,
  getFromCollection,
} from "../instances/mongo_instance.js";

export async function getBlocksFromDB(req, res) {
  try {
    const data = await getFromCollection(COLLECTIONS.BLOCKS, {
      sortColumn: "number",
      sortDirection: -1,
      pageLength: req.query.pl,
      pageNumber: req.query.pn,
      projection: [
        "_id",
        "hash",
        "timestamp",
        "number",
        "gasUsed",
        "baseFeePerGas",
        "miner",
        "transactionCount",
      ],
    });
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500);
    res.send({
      error: error,
      message: "Failed To Get Blocks",
    });
  }
}

export async function getTransactionsFromDB(req, res) {
  const blockId = req.params.blockId;
  try {
    const data = await getFromCollection(COLLECTIONS.TRANSACTIONS, {
      filterObj: {
        blockNumber: parseInt(blockId),
      },
    });
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500);
    res.send({
      error: error,
      message: `Failed To Get Transactions for Block : ${blockId}`,
    });
  }
}

export async function getStats(req, res) {
  try {
    const blockCount = await mongo_instance()
      .collection(COLLECTIONS.BLOCKS)
      .count();
    const transactionCount = await mongo_instance()
      .collection(COLLECTIONS.TRANSACTIONS)
      .count();
    let latestBlock = await getFromCollection(COLLECTIONS.BLOCKS, {
      pageLength: 1,
      pageNumber: 0,
      sortColumn: "number",
      sortDirection: -1,
    });
    latestBlock = latestBlock && latestBlock.length > 0 ? latestBlock[0] : null;
    const remainingBlocks = parseInt(latestBlock.number) - parseInt(blockCount);
    const percentageComplition = parseFloat(
      (blockCount / parseInt(latestBlock.number)) * 100
    ).toFixed(8);

    res.send({
      blockCount: blockCount,
      transactionCount: transactionCount,
      remainingBlocks: remainingBlocks,
      percentageComplition: percentageComplition,
      latestBlock: latestBlock,
    });
  } catch (error) {
    console.error(error);
    res.status(500);
    res.send({
      error: error,
      message: `Failed To Get Transactions for Block : ${blockId}`,
    });
  }
}
