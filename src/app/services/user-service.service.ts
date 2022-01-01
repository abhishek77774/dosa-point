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

  constructor() { }

  async writeToUsersCollection(formdata:any)
  {
    const docRef = await addDoc(collection(db, "users"), formdata);
  }

  async verifyCredentials(loginFormData:any)
  {
    const q = query(collection(db, "users"), where("mobile", "==", loginFormData["mobile"]), where("password", "==", loginFormData["password"]));
    const querySnapshot = await getDocs(q);
    if(querySnapshot.size>0)
    {
      return true;
    }
    else
    {
      return false;
    }
    /*
    querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());  
    });
    */
  }
  
}
