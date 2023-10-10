import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit{

  categories:any;
  constructor(private _cat:CategoryService,private _snack:MatSnackBar){}

  ngOnInit(): void {
    this._cat.categories().subscribe(
      (data)=>{
        this.categories=data;
      },(error)=>{
        this._snack.open('Server Error','Try again later',{duration:3000});
      }
    )
  }

}
