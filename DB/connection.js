import { mongoose } from "mongoose";

export const dbConnect = async () => {
  await mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => {
      console.log("MongoDb Connected Successfully");
    })
    .catch((err) => {
      console.log(err);
    });
};
