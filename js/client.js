
const socket = io("http://localhost:8000", { transports : ['websocket'] });

const form = document.getElementById('send-container');
const messageInput = document.getElementById('userMessage');
const messageContainer = document.querySelector('#message_container');
const audio = new Audio('./data/tone.mp3');

const append = (message, position, data)=>{
    const randomColor = ['Red_name', 'Blue_name', 'Green_name', 'Yellow_name'];
    const rand_color = Math.floor((Math.random() * 10) % randomColor.length);

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
    elem4.id = `::${randomColor[rand_color]}`;
    elem4.style.cssText = `Color:${randomColor[rand_color].split('_')[0]};`;
    elem4.innerText = data.Name;
    
    elem.appendChild(elem4);
    elem.appendChild(elem3);  
    elem.classList.add('message');
    elem.classList.add(position);
    messageContainer.append(elem);
    document.getElementById('message_container').scrollBy(0, 1000);

    if (position == 'left'){    
        audio.play();
    }
}

var name = prompt('Enter your name: ');
name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
socket.emit('new-user-joined', name);

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    var data = {'Message': message, 'Name': 'You', 'Color': 'Green'}
    append(`${message}`, 'right', data);
   
    socket.emit('send', data);
    messageInput.value = '';
})

socket.on('user-joined', data=>{   
    append(`Joined the chat.`, 'left', data);
})

socket.on('receive', data=>{
    append(`${data.Message}.`, 'left', data);
})

socket.on('left', (data)=>{
    append(`${data.Message}`, 'left', data);
})