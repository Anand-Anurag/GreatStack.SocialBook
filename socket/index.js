const io = require('socket.io')(8900, {
    cors: {
        origin: "http://localhost:3000"
    }
});

let users = [];

const addUser = (userId, socketId) => {
    !users.some(user => user.userId === userId) && users.push({userId, socketId});
}

const removeUser = (socketId) => {
    users = users.filter(user => user.socketId === socketId);
}

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
    console.log("Member Connected");

    io.emit("Hello from Server");

    //Connect
    socket.on('addUser', userId => {
        addUser(userId, socket.id);
        io.emit('getUsers', users);
    });

    //Get User And Send Message
    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
        const user = getUser(receiverId);
        io.to(user.socketId).emit("getMessage", {
            senderId,
            text
        });
    });

    //Disconnect
    socket.on('disconnect', () => {
        console.log("Member Disconnected");
        removeUser(socket.id);
        io.emit('getUsers', users);
    });
});