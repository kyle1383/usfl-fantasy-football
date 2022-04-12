const configs = {
  development: {
    SERVER_URI: "localhost:5000",
  },
  production: {
    SERVER_URI: "https://usfl-fantasy.herokuapp.com/",
  },
};

module.exports.config = configs[process.env.NODE_ENV];
