# eth-indexer
Writing my first Indexer to query The Ethereum Block Chain


**I'll be live blogging this captruing my thoughts on how we can build an Indexer from scratch (Backend, Database & Hopefullhy Front End as Well) in a single evening.🤞**

### Steps Needed to Build This

- [ ] Read Block Chain Data
    - [ ] Run A local Client Node.
- [ ] Parse "Transactions, Accounts...etc"
- [ ] Select a data 
- [ ] Cleanup and store data in db 
- [ ] Use Graph QL To Querry The Database 
- [ ] Simple React Frontend
- [ ] Dockerise 
- [ ] Test & Deploy
- [ ] Done! Now lets Grab a coffee!  


##  2PM - Read Block Chain Data
**Problem :** 
I need some way to read the eth block-chain??  

**Solution :** We can use other api's BUT thats cheating. Lets run our own Full Node.
