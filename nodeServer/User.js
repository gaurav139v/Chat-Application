// Pojo class contians the detail for user.
class User {

    constructor(id, name){
        this.name = name;
        this.id = id;   
        this.color = this.selectColor(); // to display the user-name with this specific color.  
    }

    // return the random color from the given list.
    selectColor(){
        const colorList = ['purple', 'blue', 'green', 'brown'];
        const numOfColor = colorList.length;
        const randNumber = Math.floor((Math.random() * 10) % numOfColor);
        return colorList[randNumber];
    }
}

module.exports = User;