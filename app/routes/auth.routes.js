// when a client sends request foe the endpoint using the HTTP request (GET,POST,PUT,DELETE), WE need to determine how the server will response by sending up the routes and

// We can seperate the routes in two parts :
//    1. Authentication and 2. Authorisation;



// Authentication : SIGN UP (/api/auth/signup) and SIGNIN(api/auth/signin)

const {verifySignUp} = require("../middlewares/verifySignUp");


const controller = require("../controllers/auth.controller");

module.exports = function(app){
      app.use(function(req, res, next){
            res.header(
                  "Access-Control-Allow-headers",
                   "x-access-token ,Origin , Content-Type , Accept"
            );
            next();
      })
      
      app.post("/api/auth/signup",[
            verifySignUp.checkDuplicateUsernameOrEmail,
            verifySignUp.checkRolesExisted
      ],
      controller.signup
      )

      app.post("/api/auth/signin",controller.signin)
}

