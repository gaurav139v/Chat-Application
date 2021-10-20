
const socket = io("http://localhost:8000", { transports : ['websocket'] });

const form = document.getElementById('send-container');
const messageInput = document.getElementById('userMessage');
const messageContainer = document.querySelector('.block');
const audio = new Audio('./data/tone.mp3');

// const append = (message, position)=>{
//     const elem = document.createElement('div');
//     elem.innerText = message;
//     elem.classList.add('message');
//     elem.classList.add(position);
//     messageContainer.append(elem);
//     if (position == 'left'){
//         console.log('audio');
//         audio.play();
//     }
// }

const append = (message, position, name='You')=>{
    const elem = document.createElement('div');

    const elem2 = document.createElement('p');
    elem2.classList.add('messageContent');
    elem2.innerText = message;
    elem.appendChild(elem2);


    const elem3 = document.createElement('div');
    elem3.classList.add('content');
    elem3.appendChild(elem2);


    const elem4 = document.createElement('p');
    elem4.classList.add('name');
    elem4.innerText = name;
    
    elem.appendChild(elem4);
    elem.appendChild(elem3);  
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
    append(`${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = '';
})

socket.on('user-joined', name=>{
    append(`${name} joined the chat.`, 'left');
})

socket.on('receive', data=>{
    append(`${data.message}.`, 'left', `${data.name}`);
})

socket.on('left', (name)=>{
    append(`${name} left the chat.`, 'left');
})