const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const UserModel = require("../models/userModel");
const UserSessionModel = require("../models/userSessionModel");
const { JWT_SECRET_KEY } = require("../constants");

const auth = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      console.log("FROM AUTH: TOKEN:"+ token)

      const userSessionObject = await UserSessionModel.findOne({
        sessionToken: token,
        isActive: true,
        isAdmin: true
      });

      console.log(userSessionObject);

      if (!userSessionObject) {
        console.log("No user session");
        res.status(401);
        throw new Error("Not authorized");
      }

      const decodedSessionToken = jwt.verify(token, JWT_SECRET_KEY);

      req.user = await UserModel.findById(decodedSessionToken.userId);
      next();
    } catch (err) {
      console.log("error Inside catch block in middleware of authentication "+ err.message);
      res.status(401).json({
        message: "Not authorized",
      });
    }
  } else {
    console.log("No token found");
    res.status(401).json({
      message: "Not authorized",
    });
  }
});

const isAdmin = asyncHandler(async (req, res, next) => {
  if (req.body.isAdmin) {
    console.log("from Auth isAdmin: req.isAdmin="+ req.body.isAdmin)
    next();
  } else {
    res.status(401).json({
      message: "Not authorized since you are not admin",
    });
  }
});

module.exports = {
  auth,
  isAdmin,
};
