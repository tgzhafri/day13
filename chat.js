// Import the functions you need from the SDKs you need
// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDb7lnjcYyVvtnolVSPnndhHJQIp7FzWtY",
  authDomain: "chat-room-a648e.firebaseapp.com",
  databaseURL:
    "https://chat-room-a648e-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "chat-room-a648e",
  storageBucket: "chat-room-a648e.appspot.com",
  messagingSenderId: "457857672256",
  appId: "1:457857672256:web:d81584dca179aa99c56ba5",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
console.log(firebase);

// chat-web code

var btn = document.getElementById("btn");
var nameInput = document.getElementById("name-input");
var msgInput = document.getElementById("msg-input");
var chatRoom = document.getElementById("chat-room");

// var today = new Date();
// var date = today.getDate()+"-"+(today.getMonth()+1)+"-"+today.getFullYear();
// var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
// var dateTime = date+' '+time;
// console.log(dateTime);

// function to get data from firebase when start the page
firebase
  .database()
  .ref("chatlist")
  .child("chatroom")
  .child("message")
  .on("child_added", function (snapshot) {
    //.val() is to get the value of the object
    // console.log(snapshot.val());

    var nameVal = snapshot.val().name; // string
    var msgVal = snapshot.val().msg; // string
    var timeVal = snapshot.val().time;
    var dateVal = snapshot.val().date;

    //create element when firebase got new child

    var chatBox = document.createElement("div");

    chatBox.classList.add("chat-box");

    if (nameVal === "zhaf") {
      chatBox.classList.add("self");
    }

    var nameText = document.createElement("h3");
    nameText.innerHTML = nameVal;

    var msgText = document.createElement("p");
    msgText.innerHTML = msgVal;

    var timeHolder = document.createElement("div");
    timeHolder.classList.add("timeStamp");

    var timeText = document.createElement("p");
    timeText.innerHTML = timeVal;

    var dateText = document.createElement("p");
    dateText.innerHTML = dateVal;

    chatBox.append(nameText);
    chatBox.append(msgText);
    timeHolder.append(timeText);
    timeHolder.append(dateText);
    chatBox.append(timeHolder);

    chatRoom.appendChild(chatBox);

    chatRoom.scrollTo(0, chatRoom.scrollHeight);
  });

var roomInput = document.getElementById("room-input");
function createRoom() {
    firebase
    .database()
    .ref("chatlist")
    .push({
      room: roomInput.value,
    });
}

firebase.database().ref("chatlist").on("child_added",
  function (snapshot) {
    console.log(snapshot.val());

    var roomVal = snapshot.val().room;



  });



function sendMsg() {
  //   console.log(nameInput.value, msgInput.value);
  //push the data and store in database
  var now = new Date();
  console.log(now.toISOString().substr(0, 10));
  console.log(now.toTimeString().substr(0, 8));

  if (msgInput.value === "") {
    alert("you need to type your message!");
    return;
  }
  firebase
    .database()
    .ref("chatlist")
    .child("chatroom")
    .child("message")
    .push({
      name: nameInput.value,
      msg: msgInput.value,
      date: now.toISOString().substr(0, 10),
      time: now.toTimeString().substr(0, 8),
    });

  msgInput.value = "";
}


var pos = 0;
var sliderContainer = document.getElementById("slider-container");
var nameHolder = document.getElementById("name-holder");
function login(posNum) {
  console.log("clicked!");
  if (nameInput.value === "") {
    alert("Please insert your Name!");
    return;
  }
  pos += posNum;
  console.log(pos);
  if (pos < -200) {
    pos = 0;
  } else if (pos > 0) {
    pos = -200;
  }
  sliderContainer.style.transform = `translateX(${pos}vw)`;

  var nameText = document.createElement("h3");
  nameText.setAttribute("id", "nameText");
  nameText.innerHTML = nameInput.value;

  nameHolder.appendChild(nameText);
}

function logout(posNum) {
  alert("We're sad to see you go :(");
  pos += posNum;
  console.log(pos);
  if (pos < -200) {
    pos = 0;
  } else if (pos > 0) {
    pos = -200;
  }
  sliderContainer.style.transform = `translateX(${pos}vw)`;
  nameInput.value = "";
  msgInput.value = "";
  document.getElementById("nameText").remove();
}
