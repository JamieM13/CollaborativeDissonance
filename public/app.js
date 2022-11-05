//Open and connect socket
let socket = io();
let myId;
let myPos;

//Listen for confirmation of connection
socket.on('connect', function () {
  console.log("Connected");
});

// listen for what your socket ID is so you know who you are in the object
socket.on('userID', function (socketId) {
  console.log("I am " + socketId);
  myId = socketId;
});


// ------------------This is where you can find variables to play with! myPos contains the distance of x and y from an average of all users' x and y. Theoretically this should mean that it works for as many users as we want to have join. myPos is an object that has the x position, y position, distance from average for x, distance from average for y, and the total distance from the average point. It is console logged in the browser. These elements for the myPos object are defined in the users array in index.js

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);

  //Listen for messages named 'data' from the server, which will contain information about current user's xy position
  socket.on('data', function (users) {

    for (i = 0; i < users.length; i++) {
      if (users[i].id == myId) {
        myPos = users[i];
      }
    }
    console.log(myPos);

    //draw an ellipse at each users' mouse position. this is where we could update graphics
    background(255);
    fill(0);
    for (i = 0; i < users.length; i++) {
      ellipse(users[i].x, users[i].y, 10, 10);
    }

  });
}





function mouseMoved() {
  //Grab mouse position
  let mousePos = { x: mouseX, y: mouseY, id: socket.id };
  //Send mouse position object to the server
  socket.emit('data', mousePos);

  // Draw yourself at your xy position
  // ----- this is where you can put something different at the cursor.
  // fill(0);
  // background(255);
  // ellipse(mouseX, mouseY, 10, 10);
}

function calcDistance() {

}

//Expects an object with a and y properties
// function drawPos(pos) {
//   fill(100);
//   ellipse(pos.x, pos.y, 10, 10);
// }