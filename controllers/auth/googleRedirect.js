const queryString = require("query-string");
const axios = require("axios");
const { User } = require("../../models");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const googleRedirect = async (req, res) => {
  const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
  const urlObj = new URL(fullUrl);
  const urlParams = queryString.parse(urlObj.search);
  const code = urlParams.code;

  const tokenData = await axios({
    url: "https://oauth2.googleapis.com/token",
    method: "post",
    data: {
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: `${process.env.BASE_URL}/api/users/google-redirect`,
      grant_type: "authorization_code",
      code,
    },
  });

  const userData = await axios({
    url: "https://www.googleapis.com/oauth2/v2/userinfo",
    method: "get",
    headers: {
      Authorization: `Bearer ${tokenData.data.access_token}`,
    },
  });

  const { id, email } = userData.data;

  const user = await User.findOne({ email });

  if (!user) {
    const newUser = await User.create({
      email: email,
      token: null,
      google: true,
    });
    newUser.setPassword(id);
    await newUser.save();
    const { _id } = newUser;
    const payload = {
      id: _id,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "7d" });
    await User.findByIdAndUpdate(_id, { token });

    return res.redirect(
      `${process.env.FRONT_URL}/?access_token=${token}&email=${email}`
    );
  }

  const { _id } = user;
  const payload = {
    id: _id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "7d" });
  await User.findByIdAndUpdate(_id, { token });

  return res.redirect(
    `${process.env.FRONT_URL}/api/users/google-redirect/?access_token=${token}&email=${user.email}`
  );
  // .status(201)
  // .json({
  //   status: "success",
  //   code: 201,
  //   data: {
  //     token,
  //     user: {
  //       email,
  //       id: user._id,
  //       balance: user.balance,
  //       balanceHasBeenSet: user.balanceHasBeenSet,
  //     },
  //   },
  // });
};

module.exports = googleRedirect;
