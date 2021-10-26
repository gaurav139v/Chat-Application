const User = require('./User.js');

class Message {
    constructor(message, user){
        this.message = message;
        // this.user = new User();
        this.user = user;
        typeof this.user;
    }
}

module.exports = Message;