
import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import path from "path";
import cors from "cors";
import { fetchCodeAllCodeProblems } from "./utils/helpers";
import { Server } from "socket.io";
import { createServer } from 'node:http';

dotenv.config();

const app = express();
app.use(cors({
  origin: "https://visionary-rabanadas-fbd1e6.netlify.app/", // TODO: Change this to your domain name when you deploy the project!
}));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.get('/test', (req: Request, res: Response) => {
  try {
    res.status(202).json('server is running you can relax')
  } catch (error) {
    console.log(error)
  }
})

app.get('/codeProblems', async (req: Request, res: Response) => {
  try {
    res.status(202).json(await fetchCodeAllCodeProblems())
  } catch (err) {
    console.dir(err)
  }
});
// catch errors
app.get('*', (request: Request, response: Response) => {
  response.status(504).json("what to do ? failed");
});

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://visionary-rabanadas-fbd1e6.netlify.app/",
    methods: ['GET', 'POST']
  }
});




io.on('connection', (socket) => {
  console.log(`New Client: ${socket.id} connected to server`);

  socket.on('CONNECTED_TO_ROOM', ({ roomId }) => {
    console.log(`Client: ${socket.id} Connected to ROOM:${roomId}`);
    const roomName = `ROOM:${roomId}`;
    socket.join(roomName);
  })

  socket.on('CODE_CHANGED', ({ codeValue, roomId }) => {
    console.log(`Code changed: ${codeValue} at ROOM: ${roomId} `);
    const roomName = `ROOM:${roomId}`;
    socket.to(roomName).emit('CODE_CHANGED', codeValue);
  })
  socket.on('disconnect', () => {
    console.log(`Client: ${socket.id} disconnected from server`);
  })
})



// const port = "onlinecoding-backend-production.up.railway.app"
const port = process.env.PORT || 3000
server.listen(port, () => {
  console.log(`server running at ${port}`)
});
