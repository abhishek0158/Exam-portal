import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';


// interface user{
//   'username':String,
//   'id':number,
//   'phone':String,
//   'role':String,
//   'enabled':boolean 
// }

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
 
  // user:user={
  //   username:'',
  //   id:0,
  //   phone:'',
  //   role:'',
  //   enabled:false
  // };
  user:any;
  constructor(private login:LoginService){
    
  }
  ngOnInit(): void {
    this.user=this.login.getUser();
    console.log(this.user);
    
  }
 

}
