const router = require("express").Router();
let User = require("../models/User.js");
const jwt = require("jsonwebtoken");


// Api Signup
router.route("/signup").post(async (req, res) => {
  console.log(req.body)

  const email = req.body.email;
  const password = req.body.password;
  const role = req.body.role;
  try {
    const newUser = new User({
      email,
      password,
      role,
    });
    const user = await newUser.save();
    res.send('save User effectuer avec succes! ')
    res.status(200).json({ user });
    
  } catch (err) {
    console.log(err);
    res.status(400).json("Error: " + err);
  }
});

// Api Login
router.route("/login").post(async (req, res) => {
  console.log("ressssssss",req.body);
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.status(200).json({ message: "0" });
    if (user.password !== password) {
      return  res.status(200).json({ message: "1" });
    }

    return res.status(200).json({ message: "2" , user:user });
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});



module.exports = router;