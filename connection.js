import mongoose from "mongoose";

async function connectMongoDb(url) {
  return mongoose
    .connect(url)
    .then(() => {
      console.log("connected mongoDb");
    })
    .catch((err) => {
      console.log("error connecting mongodb " + err);
    });
}

export default connectMongoDb;
