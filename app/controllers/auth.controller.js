const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
      try {

            const user = new User({
                  username: req.body.username,
                  email: req.body.email,
                  password: bcrypt.hashSync(req.body.password, 8)
            });
            if (req.body.roles) {
                  const roles = await Role.find({
                        name: { $in: req.body.roles }
                  })
                  user.roles = roles.map(role => role._id);
                  // await user.save()
                  // res.status(200).send({message:"successfully registered !"})

            } else {
                  const role = Role.findOne({ name: "user" });

                  if (!role) {
                        res.status(500).send({ message: "Default role not found" });
                        return;
                  }
                  user.roles = [role._id];
                  // await user.save()
                  // res.status(200).send({message:"successfully registered !"})
            }

            await user.save();
            res.status(200).send({ message: "successfully registered !" })
            console.log("successfully registered")
      } catch (err) {
            console.log(err);
      }
};

exports.signin = async (req, res) => {

      try {
            const user = await User.findOne({
                  username: req.body.username
            }).populate("roles", "-__v").exec();

            if(!user){
                  return res.status(404).send({message: "User not found"});
            }

            var passValidate = bcrypt.compareSync(req.body.password, user.password);

            if(!passValidate){
                  return res.status(401).send({
                        accessToken : null,
                        message : "Invalid Password !"
                  })
            }

            var token = jwt.sign({id: user.id},
                  config.secret,{
                        algorithm :'HS256',
                        allowInsecureKeySizes:true,
                        expiresIn:86400 //24hrs
                  }
            )
            var authorities = [];
            for(let i = 0 ; i < user.roles.length ; i++){
                  authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
            }

            res.status(200).send({
                  id : user._id,
                  username :user.username,
                  email:user.email,
                  roles:authorities,
                  accessToken : token
            })

      } catch (error) {
            console.log(error)
      }
};