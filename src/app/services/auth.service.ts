// src/app/auth/auth.service.ts

import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

import { Router } from "@angular/router";
import * as firebase from 'firebase/app';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
  
  user: Observable<firebase.User>;
  
    constructor(public afAuth: AngularFireAuth) {
      this.user = afAuth.authState;
    }
  
    login() {
      this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }
  
    logout() {
      this.afAuth.auth.signOut();
    }
}