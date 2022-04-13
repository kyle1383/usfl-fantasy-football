const authJwt = require("./middlewares/authJWT");
const verifySignUp = require("./verifySignUp");
module.exports = {
  authJwt,
  verifySignUp,
};
