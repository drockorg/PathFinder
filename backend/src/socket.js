const setupSocketHandlers = (io) => {
    io.on('connection', (socket) => {
        console.log('A user connected');

        // Handle assessment progress updates
        socket.on('assessment:progress', (data) => {
            // Broadcast progress to relevant users
            socket.broadcast.emit('assessment:progress:update', data);
        });

        // Handle disconnection
        socket.on('disconnect', () => {
            console.log('User disconnected');
        });
    });
};

module.exports = { setupSocketHandlers };