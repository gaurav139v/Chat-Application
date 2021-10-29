// user defined classes
const User = require('./User.js');
const Message = require('./Message.js');
const UsersOnline = require('./UsersOnline.js');

// modules
const io = require('socket.io')(8000);

// users = {};
// contains the details of user that are online.
users = new UsersOnline();

// when new connection connected.
io.on('connection', socket=>{ 
    
    socket.on('new-user-joined', name=>{
        // for the event when new user joined the chat.
        // name -> name of the user.
        
        var user = new User(socket.id, name);            
        users.online[socket.id] = user;  
        socket.broadcast.emit('user-joined', user);  // to inform all the user about the new user.  
    });

  
    socket.on('send', data=>{  
        /*
        To send the message to all ther user in the chat.
        data object contains:
        data -> {
            time: time when the message send,
            message: message to be send
            user = {
                name, color, id
            }
        }
        */
        data['user'] = users.online[socket.id]
        socket.broadcast.emit('receive', data);  
    });

    socket.on('disconnect', ()=>{
        /*
        When user left the chat.
        */
       // to handle old user after the server restart.
        if (users.online[socket.id] == undefined){
            return 0;
        }
        var data = {'name': users.online[socket.id]['name'], 'message': 'left the chat.', 'id': socket.id};
        socket.broadcast.emit('left', data);
        delete users.online[socket.id];     
    });
})  
