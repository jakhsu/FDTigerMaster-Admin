importScripts('https://www.gstatic.com/firebasejs/8.2.5/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.5/firebase-messaging.js');

try{
    firebase.initializeApp({
        apiKey: 'api-key',
        authDomain: 'project-id.firebaseapp.com',
        databaseURL: 'https://project-id.firebaseio.com',
        projectId: 'project-id',
        storageBucket: 'project-id.appspot.com',
        messagingSenderId: 'sender-id',
        appId: 'app-id',
        measurementId: 'G-measurement-id',
    });

    const messaging = firebase.messaging();
}catch(err){
    console.log(err);
}