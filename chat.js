module.exports = function(io){
  io.on('connection', function(socket){
    console.log("A user has connected");

    socket.on('chat message', function(msg){
      console.log("msg: " + msg);
      io.emit('chat message', msg);
    });

    socket.on('disconnect', function(){
      console.log("A user has disconnected");
    });
  });
}
