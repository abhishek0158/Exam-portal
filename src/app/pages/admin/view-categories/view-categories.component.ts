import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit{
  categories:any;

  constructor(private category:CategoryService){
    
  }
  ngOnInit(): void {
    this.category.categories()
    .subscribe((data)=>{
      this.categories=data;
    },
    (error)=>{
      console.log(error)
      Swal.fire('ERROR !!',"Error in loading server","error")
    })
  }


}
