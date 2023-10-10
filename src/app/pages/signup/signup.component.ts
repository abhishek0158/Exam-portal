import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  constructor(private userService:UserService,private snack:MatSnackBar){

  }

  public user={
    username:'',
    password:'',
    firstName:'',
    lastName:'',
    email:'',
    phone:''
  }

  formSubmit(){
    if(this.user.username==''||this.user.username===null){
      this.snack.open('Username is Required','Ok',{
        duration:3000
      })
      return ;
    }
    //addUser 
    this.userService.addUser(this.user).subscribe(
      (data)=>{
        console.log(data);
        Swal.fire('Success',`${this.user.username} Successfully Registered`,'success')
      },
      (error)=>{
        console.log(error);
        this.snack.open('Something Went Wrong...','Ok',{
          duration:3000
        })
      }
    );
  }
}
