import React from 'react';
import * as firebase from 'firebase';

//you can move this config to env variable or some place else safe.
const firebaseConfig = {
    apiKey: "AIzaSyAg5v1XuqMY3O4OL4aYUA3CCltWqnFleho",
    authDomain: "reactnativefirebaseauthstarter.firebaseapp.com",
    databaseURL: "https://reactnativefirebaseauthstarter.firebaseio.com",
    projectId: "reactnativefirebaseauthstarter",
    storageBucket: "reactnativefirebaseauthstarter.appspot.com",
    messagingSenderId: "980455433327"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);

function parseItems(results) {
  return (results)
    ? JSON.parse(results)
    : null
}

export function emailSignUp({email, password}, callback) {
  firebaseApp.auth().createUserWithEmailAndPassword(email, password)
  .then((user) => callback(null, user))
  .catch((err) => callback(err, null))
}

export function emailSignIn({email, password}, callback) {
  firebaseApp.auth().signInWithEmailAndPassword(email, password)
    .then((user) => callback(null, user))
    .catch((err) => callback(err, null))
}

export function signout(done) {
  firebaseApp.auth().signOut().then(() => done()).catch((error) => done(error))
}
