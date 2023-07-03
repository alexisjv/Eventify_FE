import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import  {Amplify, Auth } from 'aws-amplify';
import { environment } from '@core/config/environment';

export interface IUser {
  
  password: string;
  code: string;
  rol:number;
  username:string;
  'attributes': {
    'email': string,
    'name': string
  }
}

@Injectable({
  providedIn: 'root',
})
export class CognitoService {

  private authenticationSubject: BehaviorSubject<any>;

  constructor() {
    Amplify.configure({
      Auth: environment.cognito,
    });

    this.authenticationSubject = new BehaviorSubject<boolean>(false);
  }

  public signUp(user: IUser): Promise<any> {
    return Auth.signUp(user);
  }

  public confirmSignUp(email: string , code : string): Promise<any> {
    return Auth.confirmSignUp(email, code);
  }

  public signIn(email:string, password: string): Promise<any> {


    return Auth.signIn(email, password)
    .then(() => {
      this.authenticationSubject.next(true);
      this.getUser();
      Auth.currentSession();
    });
  }

  //  public signIn(email:string, password: string) {
  //   try {
  //     const user = await Auth.signIn(email, password);
  //   } catch (error) {
  //     console.log('error signing in', error);
  //   }
  //  } 
    
  public createUserCognito(){

  }

  public signOut(): Promise<any> {
    return Auth.signOut()
    .then(() => {
      this.authenticationSubject.next(false);
     
    });
  }

  public isAuthenticated(): Promise<boolean> {
    if (this.authenticationSubject.value) {
      return Promise.resolve(true);
    } else {
      return this.getUser()
      .then((user: any) => {
        if (user) {
          return true;
        } else {
          return false;
        }
      }).catch(() => {
        return false;
      });
    }
  }

  public getUser(): Promise<any> {
    return Auth.currentUserInfo();
  }

  public updateUser(user: IUser): Promise<any> {
    return Auth.currentUserPoolUser()
    .then((cognitoUser: any) => {
      return Auth.updateUserAttributes(cognitoUser, user);
    });
  }


}