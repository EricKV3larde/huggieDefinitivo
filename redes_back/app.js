const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const singupRouter = require("./routes/singup.js");
const loginRouter = require("./routes/login.js");
const usuarioRouter = require("./routes/usuario.js");
const singoutRouter = require("./routes/singout.js");
const foroRouter = require("./routes/foro.js");
const rTokenRouter = require("./routes/rToken.js");
const { authenticate } = require("./auth/authenticate.js");
const messageRouter = require('./routes/messageRoutes');
const socketIO = require('socket.io')
const http = require('http');
const bodyparser = require('body-parser');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: { origin: '*' }
});
 
io.on('connection', (socket) => {
  if(connetion){
    console.log("Un cliente se conectó");
  }else{
    console.log("Un cliente se desconectó");
  }
      // console.log("te conectaste");
      Socket.on('chat message',(msg)=>{
        io.emit('chat message', msg)
        console.log('Mensaje: ' + msg)
    })
  
});

app.use(cors());
app.use(express.json());

async function main(){
  await mongoose.connect(process.env.DB_CONNECTION_STRING);
  console.log("Conexión establecida con MongoDB");
}




main().catch(console.error);

app.use("/api/singup", singupRouter);
app.use("/api/login", loginRouter);
app.use("/api/usuario", authenticate, usuarioRouter);
app.use("/api/singout", singoutRouter);
app.use("/api/foro", foroRouter);
app.use("/api/message", messageRouter);
app.use("/api/rToken", rTokenRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
  res.sendFile(`${__dirname}/cliente/index.html`);
});





const port = process.env.PORT || 8443;
server.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});




