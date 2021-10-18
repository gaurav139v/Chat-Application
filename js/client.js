
const socket = io("http://localhost:8000", { transports : ['websocket'] });

const form = document.getElementById('send-container');
const messageInput = document.getElementById('userMessage');
const messageContainer = document.querySelector('.block');
const audio = new Audio('./data/tone.mp3');

const append = (message, position)=>{
    const elem = document.createElement('div');
    elem.innerText = message;
    elem.classList.add('message');
    elem.classList.add(position);
    messageContainer.append(elem);
    if (position == 'left'){
        console.log('audio');
        audio.play();
    }
}

const name = prompt('Enter your name: ');
socket.emit('new-user-joined', name);

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = '';
})

socket.on('user-joined', name=>{
    append(`${name} joined the chat.`, 'left');
})

socket.on('receive', data=>{
    append(`${data.name}: ${data.message}.`, 'left');
})

socket.on('left', (name)=>{
    append(`${name} left the chat.`, 'left');
})