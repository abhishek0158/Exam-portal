import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { Head, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  public loginStatusSubject=new Subject<boolean>();

  public getCurrentUser(){
   console.log('inside getCurrentUser')
   return this.http.get(`${baseUrl}/current-user`);
  }

  public generateToken(loginData:any){
    return this.http.post(`${baseUrl}/generate-token`,loginData);
  }

  public loginUser(token:string){
    localStorage.setItem('token',token);
    return true;
  }

  public isLogin(){
    let token=localStorage.getItem('token');
    if(token===undefined||token===''||token===null){
      return false;
    }
    else{
      return true;
    }
  }

  //logout remove from local storage
  public logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  public getToken(){
    return localStorage.getItem('token');
  }

  public setUser(user:any){
    localStorage.setItem('user',JSON.stringify(user));
  }
  public getUser(){
    let userStr= localStorage.getItem('user');
    if(userStr!=null){
      return JSON.parse(userStr);
    }
    else{
      this.logout();
      return null;
    }
  }

  public getUserRole(){
    let user=this.getUser();
    return user.authorities[0].authority;
  }

}
