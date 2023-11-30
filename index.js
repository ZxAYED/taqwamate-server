const express =require('express')
const  cors =require('cors')
const port = process.env.PORT || 5000 
const app =express()
require('dotenv').config();
app.use(cors())
app.use(express.json())


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.USER_ID}:${process.env.USER_PASS}@cluster0.tn5eumh.mongodb.net/?retryWrites=true&w=majority`;


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    const cardCollection = client.db("matrimony").collection("cards");
    const bookmarks = client.db("matrimony").collection("bookmarks");
    const reviews = client.db("matrimony").collection("reviews");
 app.post('/bookmarks',async(req,res)=>{
    const data=req.body
    const result=await  bookmarks.insertOne(data)
    res.send(result)

 })
app.get('/cards',async(req,res)=>{
    const result=await cardCollection.find().toArray()
    res.send(result)
})
app.get('/reviews',async(req,res)=>{
    const result=await reviews.find().toArray()
    res.send(result)
})
app.get('/singleCard/:id', async (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) }
    const result = await cardCollection.findOne(query);
    res.send(result);
  })
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
  
 
  }
}
app.get('/', (req, res) => {
    res.send('Taqwa  is coming')
  })
  
  app.listen(port, () => {
    console.log(`TAqwa is comming on port ${port}`);
  })
run().catch(console.dir);
