const mongoose = require("mongoose");

exports.DBconn = () => {
  mongoose
    .connect(process.env.MONGODB_URL, {
      dbName: "blackinfo",
    })
    .then((res) => {
     return console.log("Mongodb connected successfully", res.connection.name);
    })
    .catch((error) => {
     return console.warn("Mongodb unable to connect", error);
    });
};
