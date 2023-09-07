# eth-indexer

Writing my first Indexer to query The Ethereum Block Chain

**I'll be live blogging this captruing my thoughts on how we can build an Indexer from scratch (Backend, Database & Hopefullhy Front End as Well) in a single evening.🤞**

# Steps Needed to Build This

- [x] Run A Node Locally.
- [x] Connect To The Block chain locally.
- [x] Read Block Chain Data
- [x] Parse "Transactions, Accounts...etc"
- [x] Select a db
- [x] Live Logs of the indexer syncing
- [x] Cleanup and store data in db
- [x] Catch Errors in Syncing and add to the remote log service
- [x] Use Graph QL To Querry The Database --May be
- [x] Dockerise

# 2PM - Run A Node Locally.

**Problem :**
I need some way to read the eth block-chain??

**Solution :** We can use other api's BUT thats cheating. Lets run our own [Full Node](https://ethereum.org/en/run-a-node/), [GETH](https://ethereum.org/en/run-a-node/) Seems like a good start.

- Looks like GETH is not enough on its own. We need a concensus client. [prylabs](https://docs.prylabs.network/docs/install/install-with-script)Seems like a good optons.

-- 🚀🚀🚀 2:58PM Our Exection Layer, Beacon Node Both are running. Things are looking promissing now.

```
##Install Goeth
brew install ethereum

##Download Prysm
curl https://raw.githubusercontent.com/prysmaticlabs/prysm/master/prysm.sh --output prysm.sh && chmod +x prysm.sh

## Generate JWT Secret
./prysm.sh beacon-chain generate-auth-secret

## Run Execution Node
geth --http --http.api eth,net,engine,admin --authrpc.jwtsecret /path/to/jwt.hex


## Run Beacon Node
./prysm.sh beacon-chain --execution-endpoint=http://localhost:8551 --jwt-secret=path/to/jwt.hex
```

# 4 PM Slight Hickup

No peers are connections, the eth.blockNumber returns zero, no in bound connection on my local network either... looks like JIO wont allow inbound traffic. While we can try setting up everything we've done on a proper server for now lets focus on the next step.

# Read Block Chain Data Using [infura](https://app.infura.io/)

For now well use infura as our node provider later on we will run the node and query the entire blockchain on our server.

# 4:30 PM Infura Seems promission

We have successfull figured out how to read data from blockchain. Using web3.js and Web Socket connection provided by infura. Now lets parse it and store it.

# Update : I really want to run a proper node.

I have few credits on digital ocean, i think its time....lets run a node (execution and concensus only).

# 9PM : It's Working!!

The Node is finally syncing data BUT it will take a long time to sync and it will cost a lot of money so for now i will leave it on for a few days and see what happens. But lets use a provider for now if we have a fully synced node we will start reading from our node.
![eth_node_scrnshot](https://github.com/gauravbadarkhe/eth-indexer/assets/9333176/a5fafd2b-d56a-40cb-92d3-dbf8edf6d013)

# Next Day 2PM : Switching from [infura](https://app.infura.io/) to [blastapi](https://blastapi.io/)

The Code base looks promissing. Things are shapin up. I've have switched the provider from [infura](https://app.infura.io/) to [blastapi](https://blastapi.io/) as we needed to subscribe to events on the chain so that we can keep the index upto date. Infura does not provice that atleast for "free". but blast api does🥺.

# 5PM Parsing Data

Parsing data seems straight forward but its a 3 step procress.  
**Step 1** : Using Subscriptions lets start indexing latest blocks.  
**Step 2** : Start indexing from genesus block till we reach indexed blocks  
**Step 3** : Run Block and transaction Checkers to account for erros during first pass of indexing. Once a block is marked indexed no need to ever check it again. (We can potentially check the hashes and the integrity of data BUT that is outside the scope at the moment)

```
Block --> Transaction List --> Individual Transaction --> Presist In DB
```

## Selecting a DB

MongoDB is going to be my personl choice. Easy to use, flexible schema heavily scalable and with [Atlas](https://cloud.mongodb.com/) I Can get lots of cool features out of the box like GraphQL support and its free.

# 🚀🚀We have a live indexer!🚀🚀
Using Subscribtions we are able to get latest block and index the black along with the transactions in the datbase. We are verry clost to being done now.



# 8PM : It's Done 💪
We can now index blocks on ethereum network. We can even query legacy blocks BUT it consts money so....lets not do that right now.
[![Run in Postman](https://run.pstmn.io/button.svg)](https://god.gw.postman.com/run-collection/191540-76b6fd89-5d1a-4ca4-890b-aa2fe9e341f4?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D191540-76b6fd89-5d1a-4ca4-890b-aa2fe9e341f4%26entityType%3Dcollection%26workspaceId%3D786ba5ea-62ef-43a7-8c24-8c2f5dbc6ddf)
