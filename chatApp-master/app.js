// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCkVN4LzfWhjtBlR0JtLwWADnqNX-wV0ek",
    authDomain: "nonkuy-movie.firebaseapp.com",
    projectId: "nonkuy-movie",
    storageBucket: "nonkuy-movie.appspot.com",
    messagingSenderId: "1028577477155",
    appId: "1:1028577477155:web:566243c61b5e702c3aa796",
    measurementId: "G-EJQJR6BWZV"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Refernece contactInfo collections
let contactInfo = firebase.database().ref("infos");

// Listen for a submit
document.querySelector(".contact-form").addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();

  //   Get input Values
  let name = document.querySelector(".name").value;
  let email = document.querySelector(".email").value;
  let message = document.querySelector(".message").value;
  console.log(name, email, message);

  saveContactInfo(name, email, message);

  document.querySelector(".contact-form").reset();
}

// Save infos to Firebase
function saveContactInfo(name, email, message) {
  let newContactInfo = contactInfo.push();

  newContactInfo.set({
    name: name,
    email: email,
    message: message,
  });
}
