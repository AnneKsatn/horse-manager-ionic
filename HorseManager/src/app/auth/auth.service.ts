import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { BehaviorSubject, from, identity, Observable } from 'rxjs';
import { User } from './user.model';
import { map, tap } from 'rxjs/operators';
import { Plugins } from '@capacitor/core'
import { AngularFirestore } from '@angular/fire/firestore';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { SERVER_API_URL } from '../app.constants';


export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  localId: string;
  expiresIn: string;
  registered?: boolean;
}


export class Login {
  constructor(
    public username: string, 
    public password: string, 
    public rememberMe: boolean, 
    ) {}
}

type JwtToken = {
  id_token: string;
  id_user: string
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public resourceUrl =  SERVER_API_URL + 'api/horses';

  private _user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient, private firestore: AngularFirestore, private $localStorage: LocalStorageService, 
    private $sessionStorage: SessionStorageService) { }

  // Достает из хранилища данные и проверяет токен
  autoLogin() {
    return from(Plugins.Storage.get({key: 'authData'}))
            .pipe(map(storedData => {
              if (!storedData || !storedData.value) {
                return null;
              }
              const parsedData = JSON.parse(storedData.value) as {
                token: string; 
                // tokenExpirationDate: string;
                userId: string,
                // email: string
              };
              // const expirationTime = new Date(parsedData.tokenExpirationDate);
              // if(expirationTime <= new Date()) {
              //   return null;
              // }

              const user = new User(
                parsedData.userId,
                // parsedData.email,
                parsedData.token,
                // expirationTime
              );
              return user;
            }), 
            tap(user => {
              if (user) {
                this._user.next(user);
              }
            }),
            map(user => {
              return !!user;
            })
            );
  }

  signup(email: string, password: string){
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${
      environment.firebase.apiKey
    }`, {email: email, password: password, returnSecureToken: true})
    .pipe(tap(this.setUserData.bind(this)))
  }


  
  login(username: string, password: string, rememberMe = false): Observable<void> {
    return this.http
      .post<JwtToken>(SERVER_API_URL + 'api/authenticate-owner', {username, password, rememberMe})
      .pipe(map(
        this.setUserData.bind(this)
        ));

  }

  // login(email: string, password: string) {
  //   return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${
  //     environment.firebase.apiKey
  //   }`, {email: email, password: password, returnSecureToken: true})
  //   .pipe(tap(
  //     this.setUserData.bind(this)))
  // }

  logout(){
    this._user.next(null);
    Plugins.Storage.remove({
      key: 'authData'
    })
  }

  get userIsIsAuthenticated() {
    return this._user.asObservable()
      .pipe(map(user => {
        if(user) {
          return !!user.token
        } else {
          return false;
        }
      }));
  }

  get userId(){
    return this._user.asObservable()
      .pipe(map(user => {
        if(user) {
          return user.id;
        } else {
          return null;
        }}
        ));
  }

  private setUserData(userData: JwtToken) {

    let rememberMe = false;
    const jwt = userData.id_token;
    if (rememberMe) {
      this.$localStorage.store('authenticationToken', jwt);
    } else {
      this.$sessionStorage.store('authenticationToken', jwt);
    }


    // const expirationTime = new Date(new Date().getTime() + (+userData.expiresIn * 1000));
    this._user.next(new User(
      userData.id_user,
      // userData.email,
      userData.id_token,
      // expirationTime
    ));

    this.storeAuthData(
      userData.id_user,
      userData.id_token,
      // expirationTime.toISOString(),
      // userData.email
      )
  }

  private storeAuthData(
    userId: string,
    token: string,
    // tokenExpirationDate: string,
    // email: string
  ) {
    const data = JSON.stringify({
      userId: userId,
      token: token,
      // tokenExpirationDate: tokenExpirationDate,
      // email: email
    })
    Plugins.Storage.set({ key: 'authData', value: data })
  }
}
