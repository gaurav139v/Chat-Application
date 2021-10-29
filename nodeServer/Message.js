// Contain the infomation relate to message.
const User = require('./User.js');

class Message {
    constructor(message, user){
        this.message = message;
        this.user = user;
        this.time = new Date();
    }

    // return the time in string format.
    currentTime() {
        var time = `${this.time.getHours()}:${this.time.getMinutes()}`
        return time;
    }
}

module.exports = Message;