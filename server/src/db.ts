import mongoose from "mongoose";

mongoose.set("strictQuery", true);
async function connect() {
  try {
    await mongoose.connect(process.env.mongoURI as string);
    console.log("🚀 Connected to DB");
  } catch (error) {
    console.log("❌ DB Error", error);
    process.exit(1);
  }
}

export default connect;
