const express = require("express");
const cors = require("cors");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json());
app.use(cookieParser());

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.c60ctk1.mongodb.net/?retryWrites=true&w=majority`

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const UserCollection = client.db("SouthTechdb").collection("users");

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    app.post('/users', async(req,res) => {
        const user = req.body;
        const result = await UserCollection.insertOne(user);
          res.send(result);
        })
        app.get("/users", async (req, res) => {
            const result = await UserCollection.find().toArray();
            res.send(result);})

            app.get("/users/:id", async (req, res) => {
              const id = req.params.id;
              const result = await UserCollection.findOne({ _id: new ObjectId(id) });
              res.send(result);
            });

            app.put("/users/:id", async (req, res) => {
              const id = req.params.id;
              const filter = { _id: new ObjectId(id) };
              const option = { upsert: true };
              const updatedRole = req.body;
              const updatedDoc = {
                $set: {
                  employeeRole: 'HR',
                },
              };
              const result = await UserCollection.updateOne(filter, updatedDoc, option);
              res.send(result);
              console.log(req.body);
            });


         
           
           
      
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);











app.get("/", (req, res) => {
    res.send("SouthTech Server is Running");
  });
  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });