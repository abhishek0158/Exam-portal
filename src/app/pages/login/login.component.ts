import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginData={
    username:'',
    password:''
  };
  constructor(private snack:MatSnackBar,private loginService:LoginService,private router:Router){}

  login(){
    console.log('Hello world click login button')
    console.log(this.loginData);
    if(this.loginData.username.trim()==''||this.loginData.username===null){
      this.snack.open('Username is requried', '',{duration:3000});
     return ;
    }
    if(this.loginData.password.trim()==''||this.loginData.password==null){
      this.snack.open('Password is Required','',{duration:3000});
      return;
    }
    this.loginService.generateToken(this.loginData).subscribe(
      (data:any)=>{
        console.log('Success')
        console.log(data)
        //login..
        this.loginService.loginUser(data.token);
        this.loginService.getCurrentUser().subscribe(
          (user:any)=>{
            this.loginService.setUser(user);
            console.log(user);
            //redirect to ADMIN dashboard
            if(this.loginService.getUserRole()=='Admin'){
                this.router.navigate(['admin']);
                this.loginService.loginStatusSubject.next(true);
            }//redirect to NORMAL dashboard
            else if(this.loginService.getUserRole()=='NORMAL'){
              this.router.navigate(['user-dashboard/0']);
              this.loginService.loginStatusSubject.next(true);
            }
            else{
              this.loginService.logout();
              this.snack.open('Invalid Details ! Try again','',{duration:3000});
            }

            
          },
          (error)=>{
            console.log(error);
          }
        )
      },
      (error:any)=>{
        console.log('failed')
        console.log(error);
      }
    );
  }

}
