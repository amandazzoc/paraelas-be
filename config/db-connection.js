import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

const connect = () => {
  mongoose.connect(
    `mongodb+srv://${dbUser}:${dbPassword}@cluster0.rrkns4q.mongodb.net/paraelas?retryWrites=true&w=majority&appName=Cluster0`
  );
};

const connection = mongoose.connection;
connection.on("error", () => {
  console.log("Error connecting to the database");
});

connection.on("open", () => {
  console.log("Connected to the database");
});

connect();
export default mongoose;
