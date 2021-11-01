import io from 'socket.io-client';

const SERVER = process.env.SOCKET_SERVER || 'http://localhost:8080';

console.log('SERVER ENDPOINT @ SOCKET: ', SERVER);

let socket;

if (process.browser) {
  socket = io(SERVER);
}

// const socket = 'socket';

export default socket