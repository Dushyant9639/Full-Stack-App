let mongoose = require("mongoose");

let connectDB = async () => {
  await mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("DB Connected Succesfully"))
    .catch((err) => console.log("Error in coneccting with DB ", err.message));
};

module.exports = connectDB;
