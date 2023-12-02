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
    const requestedCollection = client.db("matrimony").collection("requested");
    const usersCollection = client.db("matrimony").collection("users");
    const bookmarks = client.db("matrimony").collection("bookmarks");
    const reviews = client.db("matrimony").collection("reviews");
 app.post('/bookmarks',async(req,res)=>{
    const data=req.body
    const result=await  bookmarks.insertOne(data)
    res.send(result)

 })
 app.post('/users',async(req,res)=>{
    const data=req.body
    const result=await  usersCollection.insertOne(data)
    res.send(result)

 })
 app.post('/requested',async(req,res)=>{
    const data=req.body
    const result=await  requestedCollection.insertOne(data)
    res.send(result)

 })
 app.post('/cards',async(req,res)=>{
    const data=req.body
    const result=await  cardCollection.insertOne(data)
    res.send(result)

 })
app.get('/cards',async(req,res)=>{
    const result=await cardCollection.find().toArray()
    res.send(result)
})
app.get('/cards/users',async(req,res)=>{
  if(req.user.email!==req.query.email){
    return res.status(403).send({message:'Forbidden Access'})
  }
  let query = {};
  if (req.query?.email) {
    query = { email: req.query.email };
  }

  

  const result =await cardCollection.find(query).toArray()
  res.send(result)
 
})
app.delete('/RizkShare/availableFoods/:id',async(req,res)=>{
  const id  =req.params.id
  
  const query ={_id :new ObjectId(id)}
  const result =await  availableFoods.deleteOne(query)
  res.send(result)
  
  })
app.patch('/cards/:id',async(req,res)=>{
  const data=req.body // desstructure kore boshano
  
const query ={_id :new ObjectId(id)}


  const id =req.params.id
  // const filter = { contactEmail: data.contactEmail };id
  const options = { upsert: true };
  const updateDoc = {
    $set: {
      fathersName:data.fathersName ,
      race,
      age,
      occupation,
      dateOfBirth,
      weight,
      height,
      profileImageLink,
      name,
      biodataType,
      status,
        mothersName,
        permanentDivision,
        presentDivision,
        expectedPartnerAge,
        expectedPartnerHeight,
        expectedPartnerWeight,
        phoneNumber,
        contactEmail,
        premiumMember
    },
  };
    const result=await cardCollection.insertOne()
    res.send(result)
})
app.get('/premium',async(req,res)=>{
  
  const query={premiumMember :'yes'}
 
    const result=await cardCollection.find(query).sort({age: 1}).toArray()
    res.send(result)
})
app.get('/users',async(req,res)=>{
    const result=await usersCollection.find().toArray()
    res.send(result)
})
app.get('/cards/users',async(req,res)=>{
  const query=req.query.email
  console.log(query);
    const result=await usersCollection.find(query)
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
app.get('/checkout/:id', async (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id)  }
    // const query = { biodataId: id }
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
