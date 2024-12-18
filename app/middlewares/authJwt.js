// TO PROCESS THE AUTHENTICATION WE CREATE FOLLOWING FUNCTIONS > 
// checking if the token is provided is legal or not. We get that from the "x-access-token" of the HTTP headers, then use jsonwebToken's verify() function.
// check if the roles of the user contains the required role or not. 

const jwt = require('jsonwebtoken');
const config =  require('../config/auth.config');
const db = require('../models');
const User  = db.user;
const Role = db.role;
// console.log(jwt)


verifyToken = (req, res, next)=>{
      let token = req.headers["x-access-token"];
      // console.log(token)
      if(!token){
            return res.status(403).send({message : "No Token provided."}); //forbidden entry
      }

      jwt.verify(token, config.secret , (err,decoded) =>{
            if(err){
                  return res.status(401).send({message : "Unauthorised access !"}); // unauthorised access
            }
            req.userId = decoded.id;
            next();
      })
}


const isAdmin = async (req, res, next) => {
      try {
        // Find the user by their ID
        const user = await User.findById(req.userId).exec();
        if (!user) {
          return res.status(404).send({ message: "User not found!" });
        }
    
        // Find roles associated with the user
        const roles = await Role.find({ _id: { $in: user.roles } }).exec();
    
        // Check if one of the user's roles is "admin"
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "admin") {
            next(); // Allow to proceed
            return;
          }
        }
    
        // If no "admin" role found, return 403
        return res.status(403).send({ message: "Admin role required!" });
      } catch (err) {
        return res.status(500).send({ message: err.message });
      }
    };
    


// isModerator = (req , res, next) =>{
//       User.findById(req.userId).exec((err,user)=>{
//             if(err){
//                   res.status(500).send({message : err});
//                   return;
//             }

//             Role.find(
//                   {_id : {$in : user.roles}},
//                   (err,roles) =>{
//                         if(err){
//                               res.status(500).send({message : err});
//                               return;
//                         }

//                         // loop for the finding the roles in the user.roles
//                         for(let i = 0 ; i < roles.length ; i++){
//                               if(roles[i].name === "moderator"){
//                                     next();
//                                     return;
//                               }
//                         }

//                         res.status(500).send({message : "Moderator role required!"});
//                         return;
//                   }
//             )
//       })
// }
const isModerator = async (req, res, next) => {
      try {
        // Find the user by their ID
        const user = await User.findById(req.userId).exec();
        if (!user) {
          return res.status(404).send({ message: "User not found!" });
        }
    
        // Find roles associated with the user
        const roles = await Role.find({ _id: { $in: user.roles } }).exec();
    
        // Check if one of the user's roles is "moderator"
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "moderator") {
            next(); // Allow to proceed
            return;
          }
        }
    
        // If no "moderator" role found, return 403
        return res.status(403).send({ message: "Moderator role required!" });
      } catch (err) {
        return res.status(500).send({ message: err.message });
      }
    };
    
const authJwt = {
      verifyToken,
      isAdmin,
      isModerator
}

module.exports = authJwt;