import express from "express";
import { config } from "dotenv";
import cors from "cors";


import cookieParser from "cookie-parser";

import { createServer } from "http";
import { Server } from "socket.io";
import readMessage from "./readMessage";


config({ path: "./config/config.env" });


const app = express();
app.use(cookieParser());
//Body parser
app.use(express.json());


app.use(cors());
app.use('/api',readMessage)

const httpServer = createServer(app);

export const io = new Server(httpServer, {
  cors: { origin: "*" },
});


const PORT = process.env.PORT || 5000;
const server = httpServer.listen(PORT, () =>
  console.log(
    "Server running in ",
    process.env.NODE_ENV,
    " mode on port ",
    PORT
  )
);

process.on("unhandledRejection", (err: Error) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});
export default httpServer;