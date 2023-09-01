const express = require("express");
const bcryct = require("bcrypt");
const passport = require("passport");
const router = express.Router();
const { getToken, getTokenEmail } = require("../utils/helpers.js");

const UserModel = require("../models/Users");

router.post("/register", async (req, res) => {
  try {
    const { email, nameEmail, password, userName } = req.body;

    if (email) {
      const user = await UserModel.findOne({ email: email });
      if (user) {
        return res
          .status(403)
          .json({ error: "A user with this email already exists" });
      }
      const newUser = await UserModel.create({
        email,
        nameEmail,
      });
    } else {
      const user = await UserModel.findOne({ userName: userName });

      if (user) {
        return res
          .status(403)
          .json({ error: "A user with this email already exists" });
      }
      const salt = 10;
      const hashedPassword = await bcryct.hash(password, salt);

      const newUser = await UserModel.create({
        password: hashedPassword,
        userName,
      });

      const token = await getToken(userName, newUser);
      const userToReturn = { ...newUser.toObject(), token };
      delete userToReturn.password;
      return res.status(200).json(userToReturn);
    }
  } catch (error) {
    console.error("Error in user registration:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  const { userName, password, email, nameEmail } = req.body;
  if (userName && password) {
    const user = await UserModel.findOne({ userName: userName });
    if (!user) {
      return res.status(403).json({ err: "Invalid credentials" });
    }
    const isPasswordValid = await bcryct.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(403).json({ err: "Invalid credentials" });
    }
    const token = await getToken(user.userName, user);
    const userToReturn = { ...user.toJSON(), token };
    delete userToReturn.password;
    return res.status(200).json(userToReturn);
    
  } 
  if (email && nameEmail) {
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      return res.status(403).json({ err: "Invalid credentials" });
    }
    const token = await getTokenEmail(user.email, user);
    const userToReturn = { ...user.toJSON(), token };
    return res.status(200).json(userToReturn);
  }
});

router.get(
  "/info",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const currentUser = req.user;
      return res.status(200).json(currentUser);
    } catch (error) {
      return res.status(500).json({ err: "Internal server error" });
    }
  }
);

router.post(
  "/infoEmail",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const {email} = req.body;
      const user = await UserModel.findOne({email: email});
      if (!user) {
        return res.status(301).json({ err: "Invalid User Email" });
      }
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ err: "Internal server error" });
    }
  }
);



module.exports = router;
