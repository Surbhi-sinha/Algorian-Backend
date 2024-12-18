// for sign up we need two functions:
      // 1.  check for duplicate username and email.
      // 2. check if roles in the request is legal or not.

const db = require('../models');
const ROLES = db.ROLES;
const User = db.user;

 checkDuplicateUsernameOrEmail = async (req,res,next)=>{
      

      try{
            const userByUserName = await User.findOne({username : req.body.username}).exec();

            if(userByUserName){
                  res.status(500).send({message : " Failed! user with username already exists"});
                  return;
            }
            const userByEmail = await User.findOne({email : req.body.email}).exec();
            if(userByEmail){
                  res.status(500).send({message : "Failed! User with email already exists"});
                  return;
            }
            next();
      }catch(err){
            res.status(500).send({message : err});
      }
};


checkRolesExisted = (req,res,next) =>{
      if(req.body.roles){
            for(let i = 0 ; i < req.body.roles.length ; i++){
                  if(!ROLES.includes(req.body.roles[i])){
                        res.status(400).send({message: `Failed1 Role ${req.body.roles[i]} does not exists!}`});
                        return;
                  }
            }
      }
      next();
}

var verifySignUp = {
      checkDuplicateUsernameOrEmail,
      checkRolesExisted
}


module.exports = {verifySignUp};