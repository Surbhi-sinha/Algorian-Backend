// for the User controller

// There are 4 functions
//    1. /api/test/all => public access
//    2. /api/test/user => user who is logged in.
//    3. /api/test/admin =>  admin access
//    4. /api/test/moderator => for moderator access


exports.allAccess = (req, res) => {
      res.status(200).send("Public Content");
}

exports.userBoard = (req , res) =>{
      res.status(200).send("User Content");
}

exports.adminBoard = (req,res)=>{
      res.status(200).send("Admin Content");
}

exports.moderatorBoard = (req ,res) =>{
      res.status(200).send("Moderator Content");
}