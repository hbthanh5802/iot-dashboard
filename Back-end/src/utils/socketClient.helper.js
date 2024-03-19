const socketIo = require('socket.io');

let socketHandler;

function useSocket({ server, data }) {
  console.log('server', server);
  const io = socketIo(server);

  io.on('connection', (socket) => {
    console.log('Client connected');

    console.log('In socketHandler');
    socket.emit('DataSensor', data);

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
}

module.exports = { useSocket, socketHandler };
