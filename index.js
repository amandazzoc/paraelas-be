import express from "express";
import mongoose from "./config/db-connection.js"
import router from "./routes/inscribedRoutes.js";
import cors from "cors";
import path from "path";

const app = express();

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", router);

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

const port = 4000;
app.listen(port, (error) => {
  if (error) {
    console.log(error);
  }
  console.log(`Server is running on port ${port}`);
});