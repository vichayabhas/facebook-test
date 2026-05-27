import express from "express";
import { config } from "dotenv";
import cors from "cors";


import cookieParser from "cookie-parser";

import { createServer } from "http";
import { Server } from "socket.io";


config({ path: "./config/config.env" });


const app = express();
app.use(cookieParser());
//Body parser
app.use(express.json());
async function readData(id: string) {
  const token2 =
  process.env.FACEBOOK_KEY
  const url = `https://graph.facebook.com/v20.0/${id}/conversations?fields=id,updated_time,participants&access_token=${token2}`;
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
  // console.log(url)
  return data;
}
app.use(cors());
app.get('api/:id',async(req,res)=>{
    const data=await readData(req.params.id)
    res.status(200).json(data)

})

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