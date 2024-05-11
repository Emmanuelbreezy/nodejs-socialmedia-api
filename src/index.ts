import express, { Application } from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.route";
import userRoute from "./routes/user.route";
import { errorMiddleware } from "./middleware";

import "dotenv/config";

const app: Application = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use(errorMiddleware);

const options = {
  dbName: process.env.DATABASE_NAME,
  user: process.env.DATABASE_USERNAME,
  pass: process.env.DATABASE_PASSWORD,
  autoIndex: true,
  connectTimeoutMS: 10000,
  socketTimeoutMS: 45000,
};

const uri = process.env.MONGODB_URI as string;

mongoose
  .connect(uri, options)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err.message));

mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to db...");
});

mongoose.connection.on("error", (err) => {
  console.log(err.message);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose connection is disconnected...");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
