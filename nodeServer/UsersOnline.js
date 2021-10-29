// Contain the details of the user that are online.

const User = require('./User.js');

class UsersOnline {

    constructor() {        
        this.online = {}; // contains key - value pair for user and unique id.
    }
}

module.exports = UsersOnline;