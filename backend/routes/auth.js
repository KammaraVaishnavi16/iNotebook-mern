const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");
const { trusted } = require("mongoose");

const JWT_SECRET = "vaishnavi";

//ROUTE 1:create a User using : POST "/api/auth/createuser". Doesn't require auth
router.post(
  "/createuser",
  [
    //user validations
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "password must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    let success = false;
    //if there are errors return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success,
        errors: errors.array(),
        error: "Enter all fields correctly",
      });
    }
    try {
      //check whether user with this email exists already
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({
          success,
          error: "Sorry a user with the email already exists",
        });
      }
      const salt = await bcrypt.genSalt(10);
      const secrectPass = await bcrypt.hash(req.body.password, salt);
      //create a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secrectPass,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
    //the below is another way to create a user
    // const user = User(req.body)
    // user.save()
    // res.json(user);
  }
);

//ROUTE 2:Authenticate a User using : POST "/api/auth/login". Doesn't require auth
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          success,
          error: "Please try to login with correct credientials",
        });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({
          success,
          error: "Please try to login with correct credientials",
        });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server Error");
    }
  }
);

//ROUTE 3: Get Logged in user details using : GET "api/auth/getuser" Login required
router.get("/getuser", fetchuser, async (req, res) => {
  let success = true;
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.json({ success, user });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server Error");
  }
});

module.exports = router;
