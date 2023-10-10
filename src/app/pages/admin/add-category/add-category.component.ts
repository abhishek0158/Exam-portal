import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit{

  category_data={
    'title':'',
    'description':''
  };
  constructor(private category:CategoryService,private snack:MatSnackBar){

  }
  ngOnInit(): void {
   
  }
  formSubmit(){
    if(this.category_data.title.trim()==''||this.category_data.title==null){
      this.snack.open("Title required","OK",{
        duration:3000
      })
      return ;
    }
    if(this.category_data.description.trim()===''||this.category_data.description===null){
      this.snack.open('Description is required',"OK",{
        duration:3000
      })
      return;
    }
    this.category.addCategory(this.category_data)
    .subscribe((data)=>{
      console.log('added category succefully');
      console.log(data)
      Swal.fire("Success!!","Added Category Succefully",
      'success')
      this.category_data={
        'title':'',
        'description':''
      }
    },(error)=>{
      console.log(error);
      Swal.fire('Server Error!!','Cannot added Category! Try again later!!',"error");
    }
    );
  }


}
