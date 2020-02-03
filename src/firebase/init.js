import firebase from 'firebase'
// Your web app's Firebase configuration
 var firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "ivarchat.firebaseapp.com",
    databaseURL: "https://ivarchat.firebaseio.com",
    projectId: "ivarchat",
    storageBucket: "cle",
    messagingSenderId: "messagingSenderId",
    appId: "YOUR_APP_ID",
    measurementId: "measurementId"
  };
  // Initialize Firebase
  const firebaseApp=firebase.initializeApp(firebaseConfig);
  //firebaseApp.firestore().settings({timestampsInSnapshots:true})

  export default firebaseApp.firestore()

  firebase.analytics();