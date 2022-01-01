import { Injectable } from '@angular/core';
import { initializeApp } from "firebase/app"
import { getFirestore, doc, query, where, getDocs, getDoc, collection, addDoc } from "firebase/firestore"

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
    console.log("calling");
    const q = query(collection(db, "users"), where("mobile", "==", "9999999999"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
});
  }
  
  constructor() { }
}
