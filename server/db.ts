import mongoose from "mongoose";
const config = require("./config/key");

mongoose.set("strictQuery", true);
mongoose.connect(config.mongoURI as string);

const mongooseConnection: mongoose.Connection = mongoose.connection;

mongooseConnection.on("connected", (): void => {
  console.log("🚀 Connected to DB");
});

mongooseConnection.on("error", (error): void => {
  console.log("❌ DB Error", error);
});
