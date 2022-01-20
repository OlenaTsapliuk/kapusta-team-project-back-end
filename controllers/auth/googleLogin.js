const queryString = require("query-string");

const googleLogin = async (req, res) => {
  const params = queryString.stringify({
    client_id: process.env.GOOGLE_CLIENT_ID,
    redirect_uri: `${process.env.BASE_URL}/api/users/google-redirect`,

    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ].join(" "),
    response_type: "code",
    access_type: "offline",
    prompt: "consent",
  });
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      token,
      user: {
        email,
        id: user._id,
        balance: user.balance,
        balanceHasBeenSet: user.balanceHasBeenSet,
      },
    },
  });
  return res.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params}`);
};

module.exports = googleLogin;
