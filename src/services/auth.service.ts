import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { from } from 'rxjs/observable/from';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {
  constructor(private auth: AngularFireAuth) {}

  loggedIn(): Observable<boolean> {
    return this.auth.authState.pipe(map(user => !!user));
  }

  getUser(): Observable<{ email: string; uid: string }> {
    return this.auth.authState.pipe(
      map(result => {
        if (!result) {
          return result;
        }

        const { email, uid } = result;
        return { email, uid };
      })
    );
  }

  login(loginEmail: string, password: string): Observable<any> {
    return from(
      this.auth.auth.signInWithEmailAndPassword(loginEmail, password)
    ).pipe(
      map(result => {
        const { email, uid } = result;
        return { email, uid };
      })
    );
  }

  logout(): Observable<any> {
    return from(this.auth.auth.signOut());
  }
}
