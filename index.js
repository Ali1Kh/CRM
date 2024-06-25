import { dbConnect } from "./DB/connection.js";
import app from "./src/app.js";

const port = process.env["PORT"] || 3333;

await dbConnect();

const server = app.listen(port, () => {
  console.log(`\nListening at http://localhost:${port}/api`);
});

server.on("error", console.error);
