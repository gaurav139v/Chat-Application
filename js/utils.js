// contains client side funtionality.

const form = document.getElementById('send-container');
const messageInput = document.getElementById('userMessage');
const messageContainer = document.querySelector('#message_container');
const audio = new Audio('./data/tone.mp3');
 
function appendToChatbox(element){
    // To add the message or info the the chat box.
    messageContainer.append(element);    
    document.getElementById('message_container').scrollBy(0, 1000);
    return true;
}
    
function createMessageElement(message, position, data) {     
    /*
    To create the message element
    param:
    message: message to be display.
    position: position of the message.
    data: {
            user: name of the user.
            id: id of the user.
            color: color of the user-name.
          }

    return below element:
    <div class='message left'>
        <div class='name'>
            <span class='person_name'>Gaurav</span>
            <span class='message_time'>10:50</span>
        </div>
        <div class='content'>
            <p class='messageContent'>Hey, What up?</p>           
        </div>
    </div>
    */
    const elem = document.createElement('div');

    const elem2 = document.createElement('p');
    elem2.classList.add('messageContent');
    elem2.innerText = data.message;
    elem.appendChild(elem2);

    const elem3 = document.createElement('div');
    elem3.classList.add('content');
    elem3.appendChild(elem2);

    const elem4 = document.createElement('div');
    elem4.classList.add('name');

    const elem5 = document.createElement('sapn');
    elem5.classList.add('person_name');
  
    elem5.style.cssText = `color:${data.user.color};`;  // set the specific user-name color
    elem5.innerText = `${data.user.name}`;
   
    const elem6 = document.createElement('span');
    elem6.classList.add('message_time');
    elem6.innerText = `${data.time}`;

    elem4.appendChild(elem5);
    elem4.appendChild(elem6);
    
    elem.appendChild(elem4);
    elem.appendChild(elem3);  
    elem.classList.add('message');
    elem.classList.add(position);
 
    return elem;
}

function appendMessage(message, position, data){
    // add message to the chatbox.
    const msg = createMessageElement(message, position, data);
    appendToChatbox(msg);

    // Play message tone.
    if (position == 'left'){    
        audio.play();
    }
    return true;
}

function createInfoElement(message) {
    /*
    Create the info element.
    param:
    message: info message to be append.

    return below element:
    <div class='info'>
        <p class='info_message left'>"Gaurav" joined the chat.</p>               
    </div>        
    */
    const elem = document.createElement('div');
    elem.classList.add('info');

    const elem2 = document.createElement('p');
    elem2.innerText = message;
    elem2.classList.add('info_message');
    elem2.classList.add('left');

    elem.appendChild(elem2);

    return elem;
}

function appendInfo(message){
    // add info message to the chatbox.
    console.log('message: ', message);
    const info = createInfoElement(message);
    appendToChatbox(info);
    return true;
}

function askForName(){
    // Promt the box for user name.
    var name = prompt('Enter your name: ');
    name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    return name;
}

form.addEventListener('submit', (e)=>{
    // listen for the message send.
    e.preventDefault();
    const message = messageInput.value;
    const time = new Date();
    var data = {'message': message, 'time': `${time.getHours()}:${time.getMinutes()}`, 'user': {'name': 'You', 'color': 'red'}};
    appendMessage(`${message}`, 'right', data);
   
    // send message to all the user.
    socket.emit('send', data);
    messageInput.value = '';
})


