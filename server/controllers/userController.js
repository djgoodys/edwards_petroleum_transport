const User = require('../models/userModel');
const bcrypt = require('bcrypt');

async function login(req, res) {
  try {
    let response = '';
    const { username, password } = req.body;
    const user = await User.find({username:username});
    user.forEach(item=>{
      console.log(item.username)
    })
    if (user) {
      const userObj = user[0];
        if(password == userObj.password){
          res.json({"login":"passed"})
        } else {
          res.json({"login":"failed"})
        }
    } else {
      res.json({message:"No users found username:"+username})
      console.log("No users found username:"+username);
    }

    //res.json({user});


  } catch (err) {
    console.error('Error during login:', errmessage);
    return res.status(500).send(err.message);
  }
      }

async function manageUsers(req, res) {
  // Your implementation for manageUsers here
}

module.exports = {
  manageUsers,
  login
};
