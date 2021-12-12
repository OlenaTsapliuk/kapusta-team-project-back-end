const { Unauthorized, NotFound } = require("http-errors");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

const { SECRET_KEY = "jghdfggfhgg" } = process.env;


const authenticate = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw new Unauthorized();
    }

    const [bearer, token] = req.headers.authorization.split(" ");
    if (bearer !== "Bearer") {
      throw new Unauthorized();
    }
    try {
      const { id } = jwt.verify(token, SECRET_KEY);
      const user = await User.findById(id);
      if (!user || !user.token) {
        throw new Unauthorized("User not found");
      }
      req.user = user;
      next();
    } catch (err) {
      throw new Unauthorized(err.message);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = authenticate;
