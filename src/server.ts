
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
  origin: "https://main--visionary-rabanadas-fbd1e6.netlify.app", // TODO: Change this to your domain name when you deploy the project!
}));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://main--visionary-rabanadas-fbd1e6.netlify.app",
    methods: ['GET', 'POST']
  }
});

app.get('/', async (req: Request, res: Response) => {
  try {
    res.status(202).json(await fetchCodeAllCodeProblems())
  } catch (err) {
    console.dir(err)
  }
});

io.on('connection', (socket) => {
  console.log(`New Client connected ${socket.id}`);

  socket.on('CONNECTED_TO_ROOM', ({ roomId }) => {
    console.log(`Connected to Room:${roomId}`);
    const roomName = `ROOM:${roomId}`;
    socket.join(roomName);
  })

  socket.on('CODE_CHANGED', ({ codeValue, roomId }) => {
    console.log('Code_changed', codeValue);
    const roomName = `ROOM:${roomId}`;
    // socket.broadcast.emit('CODE_CHANGED', code);
    socket.to(roomName).emit('CODE_CHANGED', codeValue);
  })
  socket.on('disconnect', () => {
    console.log(`Client disconnected`);
  })
})
const port = "onlinecoding-backend-production.up.railway.app"
server.listen(port, () => {
  console.log(`server running at ${port}`)
});
