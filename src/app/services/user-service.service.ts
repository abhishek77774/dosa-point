import { Injectable } from '@angular/core';
import { initializeApp } from "firebase/app"
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore"

const firebaseApp = initializeApp({
  apiKey: "AIzaSyB3EE-fMVGHKpXDC4rs3-jUf1Z7KHEbGYs",
  authDomain: "dosapointfirebase.firebaseapp.com",
  projectId: "dosapointfirebase",
});

const db = getFirestore();
const users = doc(db, 'users/3');

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  async writeToUsersCollection(formdata:any)
  {
    await setDoc(users, formdata);
  }

  async readFromUsersCollection()
  {
    const myData = await getDoc(users);
    if(myData.exists())
    {
      const docData = myData.data();
      console.log("data is:", docData);
    }
  }
  
  constructor() { }

 
}
