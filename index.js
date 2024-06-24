import dotenv from "dotenv";
import express from "express";
import { dbConnect } from "./DB/connection.js";
import cors from "cors";

dotenv.config();
const port = process.env.PORT;
const app = express();
const server = createServer(app);
app.use(cors());
app.use(express.json());

await dbConnect();

app.listen(port, () => console.log(`App is listening on port ${port}!`));
