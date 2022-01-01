import { Injectable } from '@angular/core';
import { initializeApp } from "firebase/app"
import { getFirestore, doc, setDoc, getDoc, collection, addDoc } from "firebase/firestore"

const firebaseApp = initializeApp({
  apiKey: "AIzaSyB3EE-fMVGHKpXDC4rs3-jUf1Z7KHEbGYs",
  authDomain: "dosapointfirebase.firebaseapp.com",
  projectId: "dosapointfirebase",
});

const db = getFirestore();
//const users = doc(db, 'users/3');

@Injectable({
  providedIn: 'root'
})

export class UserServiceService {

  async writeToUsersCollection(formdata:any)
  {
    const docRef = await addDoc(collection(db, "users"), formdata);
  }

  async readFromUsersCollectionForFirstEntry()
  {
    const users = doc(db, 'users/1');
    const myData = await getDoc(users);
    if(myData.exists())
    {
      const docData = myData.data();
      console.log("data is:", docData);
    }
  }
  
  constructor() { }
}
