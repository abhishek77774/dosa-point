import { Injectable } from '@angular/core';
import { initializeApp } from "firebase/app"
import { getFirestore, query, where, getDocs, getDoc, collection, addDoc, Firestore, DocumentData } from "firebase/firestore"

const firebaseApp = initializeApp({
  apiKey: "AIzaSyB3EE-fMVGHKpXDC4rs3-jUf1Z7KHEbGYs",
  authDomain: "dosapointfirebase.firebaseapp.com",
  projectId: "dosapointfirebase",
});

const db = getFirestore();

@Injectable({
  providedIn: 'root'
})

export class UserServiceService {

  constructor() { }

  readData:any;

  async writeToUsersCollection(formdata:any)
  {
    const docRef = await addDoc(collection(db, "users"), formdata);
    //return docRef;
  }

  async verifyCredentials(loginFormData:any)
  { 
    
    const checkAccountQuery = query(collection(db, "users"), where("email", "==", loginFormData["email"]), where("activated", "==", true));
    const querySnapshotforAccount = await getDocs(checkAccountQuery);
    
    if(querySnapshotforAccount.size>0)
    {
      return 1;
    }
     return 0;  
  }

  async verifyAdminCredentials(loginFormData:any)
  { 
    const checkCredentialsQuery = query(collection(db, "users"), where("email", "==", loginFormData["email"]),
    where("activated", "==", true), where("role", 'in', ["admin", "developer"]));
    const querySnapshotForCredentials = await getDocs(checkCredentialsQuery);

    if(querySnapshotForCredentials.size>0)
    {
      return 1;
    } 
    return 0;
  }

  async checkAlreadyRegisteredMobile(loginFormData:any)
  { 
    
    const checkAccountQuery = query(collection(db, "users"), where("mobile", "==", loginFormData["mobile"]));
    const querySnapshotforAccount = await getDocs(checkAccountQuery);
    
    if(querySnapshotforAccount.size>0)
    {
      return 1;
    }
     return 0;  
  }
}
