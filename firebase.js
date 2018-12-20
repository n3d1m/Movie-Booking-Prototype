import * as firebase from "firebase";
import "firebase/firestore";

var config = {
  apiKey: "AIzaSyBgIK1HnNCMLhCNn2KKkp4eZZ_DQ5CO3vM",
  authDomain: "movie-tickets-backend.firebaseapp.com",
  databaseURL: "https://movie-tickets-backend.firebaseio.com",
  projectId: "movie-tickets-backend",
  storageBucket: "movie-tickets-backend.appspot.com",
  messagingSenderId: "848098335276"
};

firebase.initializeApp(config);

export default firebase;
