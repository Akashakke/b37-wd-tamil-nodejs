const express = require("express");
const app = express();
const cors = require("cors")
const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient
const URL = "mongodb://localhost:27017";
const DB = "batch_37_wd_tamil"


let users = [];

app.use(express.json());

app.use(cors({
  origin : "http://localhost:3001"
}))

app.get("/users",async function(req,res){

try {
  const connection = await mongoClient.connect(URL);
 
 const db = connection.db(DB)

 let resUser = await db.collection("users").find().toArray()
 
 
 
 await  connection.close()
 res.json(resUser);
} catch (error) {
  console.log(error)
  res.status(500).json({message:"Something went wrong"}) 
}

// let qParams = req.query
 //console.log(qParams)

// let resUser =[]
// for (let index = parseInt(req.query.offset);index<parseInt(req.query.limit);index++){
//  resUser.push(users[index])
// }

});



app.post("/user",async   function(req,res){


 try {
  const connection = await mongoClient.connect(URL);
 
 const db = connection.db(DB)

 await db.collection("users").insertOne(req.body)
 
 
 
 await  connection.close();
res.json({message:"Data inserted"}) 

} catch (error) {
  console.log(error)
  res.status(500).json({message:"Something went wrong"})
 }
 
 
 
 
 
  // req.body.id = users.length + 1;
 // users.push(req.body);
 // res.json({message:"User Created Successfully"});
});

app.get("/user/:id",async function(req,res){

  try {
    const connection = await mongoClient.connect(URL);
   
   const db = connection.db(DB)
  
  let user = await db.collection("users").findOne({_id: mongodb.ObjectId(req.params.id)})
   
   
   
   await  connection.close();
  res.json(user) 
  
  } catch (error) {
    console.log(error)
    res.status(500).json({message:"Something went wrong"})
   }
   



 // let userId = req.params.id;
 // let user = users.find((item) => item.id == userId);
 // if(user){
 //   res.json(user)
 // }else{
   // res.json({message : "User not found"})
 // }
})

app.put("/user/:id",async  function(req, res){

  try {
    const connection = await mongoClient.connect(URL);
   
   const db = connection.db(DB)
  
  let user = await db.collection("users").findOneAndUpdate({_id: mongodb.ObjectId(req.params.id)},{$set:req.body})
   
   
   
   await  connection.close();
  res.json(user) 
  
  } catch (error) {
    console.log(error)
    res.status(500).json({message:"Something went wrong"})
   }


 // let userId = req.params.id;
 // let userIndex = users.findIndex((item) => item.id == userId);
 
 
 // if(userIndex!=-1){
 //   Object.keys(req.body).forEach((item) => {
   //   users[userIndex][item] = req.body[item];
   // })
  // res.json({
   //   message : "Done"
   // })
 // }else{
   //  res.json({
    //  message:"User not found"
    // })
  //}
})

app.delete("/users/:id",async function(req,res){

  try {
    const connection = await mongoClient.connect(URL);
   
   const db = connection.db(DB)
  
  let user = await db.collection("users").findOneAndDelete({_id: mongodb.ObjectId(req.params.id)})
   
   
   
   await  connection.close();
  res.json(user) 
  
  } catch (error) {
    console.log(error)
    res.status(500).json({message:"Something went wrong"})
   }



//  let userId = req.params.id;
//  let userIndex = users.findIndex((item) => item.id == userId);
 
//  if (userIndex !=1){
//    users.splice(userIndex,1);
//    res.json({
//      message : "User Deleted"
//    })
    
//  } else {
//    res.json({
      message : "User not found"
//    })
//  }



}),
app.listen(process.env.PORT || 3000 );
