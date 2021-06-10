importScripts('https://www.gstatic.com/firebasejs/7.14.6/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.14.6/firebase-messaging.js');

var firebaseConfig = {
    apiKey: "AIzaSyCkVN4LzfWhjtBlR0JtLwWADnqNX-wV0ek",
    authDomain: "nonkuy-movie.firebaseapp.com",
    databaseURL: "https://nonkuy-movie-default-rtdb.firebaseio.com",
    projectId: "nonkuy-movie",
    storageBucket: "nonkuy-movie.appspot.com",
    messagingSenderId: "1028577477155",
    appId: "1:1028577477155:web:566243c61b5e702c3aa796",
    measurementId: "G-EJQJR6BWZV"
};

firebase.initializeApp(firebaseConfig);
const messaging=firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
    console.log(payload);
    const notification=JSON.parse(payload);
    const notificationOption={
        body:notification.body,
        icon:notification.icon
    };
    return self.registration.showNotification(payload.notification.title,notificationOption);
});