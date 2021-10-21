const io = require('socket.io')(8000);

users = {};

io.on('connection', socket=>{ 
    socket.on('new-user-joined', name=>{        
        users[socket.id] = {'Name': name, 'Color': 'Red'};
        socket.broadcast.emit('user-joined', users[socket.id]);
 
    });

    socket.on('send', data=>{
        data['Name'] = users[socket.id]['Name'];
        data['Id'] = socket.id;
        socket.broadcast.emit('receive', data);  
    })

    socket.on('disconnect', ()=>{
        if (users[socket.id] == undefined){
            return 0;
        }
         var data = {'Name': users[socket.id]['Name'], 'Message': 'left the chat.', 'Id': socket.id};
        socket.broadcast.emit('left', data);
        delete users[socket.id];
     
    })
})  
