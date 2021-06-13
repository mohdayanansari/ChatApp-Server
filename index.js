//server-side
const io = require('socket.io')(3000, {
    cors:{
        origin:'*',
    }
});


const users = {};

// runnning socket.io server which is an instant of http-->basically it will listen every connections...
io.on('connection', socket => {
    //it will decide what will happen with a particular connection
    socket.on('new-user-joined', name => {
        // console.log("New user", name);
        //will append the data in users object:
        users[socket.id] = name;
        //It will broadcast a message to other users if a new user will join!
        socket.broadcast.emit('user-joined', name);
    });

   
    socket.on('send', message => {
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]})
    });
    //user socket disconnect event (when user disconnect)
    socket.on('disconnect', message => {
        socket.broadcast.emit('leave', users[socket.id]);
        delete users[socket.id];
    });

})





