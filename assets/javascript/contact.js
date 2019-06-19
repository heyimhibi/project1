var firebaseConfig = {
  apiKey: "AIzaSyC6czO70FR-41_kSaHpuGOJ1JpfCC5_iOI",
  authDomain: "pinpoint-6e90c.firebaseapp.com",
  databaseURL: "https://pinpoint-6e90c.firebaseio.com",
  projectId: "pinpoint-6e90c",
  storageBucket: "pinpoint-6e90c.appspot.com",
  messagingSenderId: "617094224585",
  appId: "1:617094224585:web:1123e1792b632302"
};

firebase.initializeApp(firebaseConfig);

var database = firebase.database();

$("#add-contact-btn").on("click", function (event) {
  event.preventDefault();


  var userName = $("#name-input").val().trim();
  var userEmail = $("#email-input").val().trim();
  var userMessage = $("#message-input").val().trim();


  var newUser = {
    name: userName,
    email: userEmail,
    message: userMessage
  };


  database.ref().push(newUser);

  $("#name-input").val("");
  $("#email-input").val("");
  $("#message-input").val("");
});