import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  isLoggedIn=false;
  user:any;
 
    constructor(private login:LoginService){
      console.log('INSIDE NAVBAR COMPONENT')
      this.login.loginStatusSubject.asObservable().subscribe(data=>{
        this.isLoggedIn=this.login.isLogin();
        console.log('heree... ',this.isLoggedIn);
        this.user=this.login.getUser();
        console.log('type ',typeof(this.user))
        console.log(data)
        console.log('user',this.user.username);
      });
      if(localStorage.getItem('user')){
        console.log("below observer")
        this.isLoggedIn=true;
        this.user=login.getUser();
      }
    }
  ngOnInit(): void {
    // this.isLoggedIn=this.login.isLogin();
    //   this.user=JSON.parse(this.login.getUser());
      
      
  }


    public logout(){
      this.login.logout();
       window.location.reload();
      //this.login.loginStatusSubject.next(false);
    }

}
