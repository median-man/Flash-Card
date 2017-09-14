// create BasicCard constructor
var BasicCard = function(front, back) {
    if ( this instanceof BasicCard ) {
        this.front = front;
        this.back = back;
    } else {
        return new BasicCard(front, back);
    }
};
// export BasicCard constructor
module.exports = BasicCard;