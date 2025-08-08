// socket.js

const { Server } = require("socket.io");

let ioInstance = null;

const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: '*', 
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', (socket) => {
    console.log(`⚡ Socket connected: ${socket.id}`);

    socket.on('disconnect', () => {
      console.log(`❌ Socket disconnected: ${socket.id}`);
    });
  });

  ioInstance = io;
};

const emitOrderUpdate = (orderData) => {
  if (ioInstance) {
    ioInstance.emit('orderUpdated', orderData);
    console.log('📢 Order update emitted:', orderData);
  }
};

module.exports = { initSocket, emitOrderUpdate };
