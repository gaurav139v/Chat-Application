const User = require('./User.js');
const Message = require('./Message.js');
const UsersOnline = require('./UsersOnline.js');
const io = require('socket.io')(8000);

// users = {};
users = new UsersOnline();

io.on('connection', socket=>{ 
    socket.on('new-user-joined', name=>{
        var user = new User(socket.id, name);  
        console.log(user);      
        // users[socket.id] = user;
        users.online[socket.id] = user;
        console.log(users);
        socket.broadcast.emit('user-joined', user);        
    });

    socket.on('send', data=>{
        data['Name'] = users.online[socket.id]['Name'];
        data['Id'] = socket.id;
        socket.broadcast.emit('receive', data);  
    })

    socket.on('disconnect', ()=>{
        if (users.online[socket.id] == undefined){
            return 0;
        }
         var data = {'Name': users.online[socket.id]['Name'], 'Message': 'left the chat.', 'Id': socket.id};
        socket.broadcast.emit('left', data);
        delete users.online[socket.id];     
    })
})  
