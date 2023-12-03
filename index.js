const express =require('express')
const  cors =require('cors')
var cookieParser = require('cookie-parser')



const port = process.env.PORT || 5000 
const app =express()
const jwt=require('jsonwebtoken')
require('dotenv').config();

app.use(cookieParser())
app.use(cors({
  origin :[ 'http://localhost:5173','https://z-matrimony-server.vercel.app'],credentials:true
}))
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


 app.post('/jwt',async(req,res)=>{
  const user=req.body
  const token =jwt.sign(
   user
  , process.env.ACCESS_TOKEN_SECRET, { expiresIn: 60 * 60 });
  res.cookie('token',token,{
    httpOnly:true,
    secure:true
  })
  .send({token})
 })   
 app.post('/logOut',async(req,res)=>{
    const data=req.body
 
    res.clearCookie('token',{maxAge :0}).send({success:true})

 })
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
app.get('/cards/user',async(req,res)=>{
  const query={contactEmail:req.query.email}
    const result=await cardCollection.find(query).toArray()
    res.send(result)
})
app.get('/bookmarks',async(req,res)=>{
   const query = { UserEmail: req.query.email }
  const result =await bookmarks.find(query).toArray()
  res.send(result)

})


  


app.delete('/bookmarks/:id',async(req,res)=>{
  const id  =parseFloat(req.params.id)

  const query ={biodataId :id}
  const result =await  bookmarks.deleteOne(query)
  res.send(result)
  
  })
app.delete('/requested/:id',async(req,res)=>{
  const id  =parseFloat(req.params.id)

  const query ={biodataId :id}
  const result =await  requestedCollection.deleteOne(query)
  res.send(result)
  
  })

app.patch('/users/admin/:id',async(req,res)=>{
  const id =req.params.id
  const query={_id: new ObjectId(id)}

 const Update={
  $set:{ Role :'admin'}
 }
 const result= await usersCollection.updateOne(query,Update)
 res.send(result)
})
app.patch('/users/admin/premium/:id',async(req,res)=>{
  const id =req.params.id
  const query={biodataId: id}

 const Update={
  $set:{ Role :'premium'}
 }
 const result= await usersCollection.updateOne(query,Update)
 res.send(result)
})
app.put('/cards/:id',async(req,res)=>{

  // desstructure kore boshano
  
const query ={_id :new ObjectId(id)}
// const data=req.body

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
    const result=await cardCollection.updateOne()
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
  const item=req.query.email
  const query={UserEmail :req.query.email}

    const result=await usersCollection.find(query).toArray()
    res.send(result)
})
app.get('/requested/user',async(req,res)=>{

  const query={UserEmail :req.query.email}

    const result=await requestedCollection.find(query).toArray()
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
    const result = await cardCollection.findOne(query);

    res.send(result);
  })













    // console.log("Pinged your deployment. You successfully connected to MongoDB!");
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
