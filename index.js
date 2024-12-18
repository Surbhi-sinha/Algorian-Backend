// server

const express = require("express");
const cors = require("cors");
const dbConfig = require("./app/config/db.config")

const app =  express();

var corsOptions ={
      origin : "http://localhost:8081"
};

app.use(cors(corsOptions.origin));

//connecting mongoose connection to the MONOGODB database
const db = require("./app/models");
const Role = db.role;

//mongodb://localhost:27017/
db.mongoose.connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}` , {
      useNewUrlParser : true,
      useUnifiedTopology : true
}).then(()=>{
      console.log("successfully connected to the MONGODB");
      initializeRoles();
}).catch(err =>{
      console.error("Connection error : ",err );
      process.exit()
})

//parse request of content type - application json
app.use(express.json());

//parse request to content type to the xxx-form-url-encoder
app.use(express.urlencoded({extended : true}));

//simple route 
app.get('/' , function(req , res){
      res.json({
            message : "Welcome to Algorian"
      })
})

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);



const PORT  = process.env.PORT || 8080;

// app listener
app.listen(PORT , ()=>{
      console.log(`Servers are running on port http://localhost:${PORT}`);
})


async function initializeRoles() {
      try {
        const count = await Role.estimatedDocumentCount();
        if (count === 0) {
          // Adding user role
          await new Role({ name: "user" }).save();
          console.log("Added 'user' to roles collection");
    
          // Adding moderator role
          await new Role({ name: "moderator" }).save();
          console.log("Added 'moderator' to roles collection");
    
          // Adding admin role
          await new Role({ name: "admin" }).save();
          console.log("Added 'admin' to roles collection");
        }
      } catch (err) {
        console.error("Error: ", err);
      }
    }
    
    