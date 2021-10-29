const socket = io("http://localhost:8000", { transports : ['websocket'] });

const user = askForName();
console.log('User is: ', user);
socket.emit('new-user-joined', user);

socket.on('user-joined', data=>{   
    // when new user joined the chat 
    console.log('New user joined: ', data);
    appendInfo(`"${data.name}" joined the chat.`);
})

socket.on('receive', data=>{
    // when receive a message.
    console.log('Message received: ', data)
    appendMessage(`${data.message}`, 'left', data);
})

socket.on('left', (data)=>{  
    // when user left the chat.
    console.log('User left: ', data);  
    appendInfo(`"${data.name}" left the chat.`)
})