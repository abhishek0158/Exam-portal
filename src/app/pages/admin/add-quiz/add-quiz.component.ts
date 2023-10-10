import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit{
  categories:any;

  quizData={
    title:'',
    description:'',
    maxMarks:'',
    numberOfQuestions:'',
    active:true,
    category:null
  }

  constructor(private quizServie:QuizService,private category:CategoryService,private snak:MatSnackBar){

  }
  ngOnInit(): void {
   this.category.categories().subscribe(
      (data)=>{
        this.categories=data;
      },
      (error)=>{
          console.log(error);
          Swal.fire('Error!!','Error in loading data from server',
          'error')
      }
    )
  }
  addQuiz(){
    if(this.quizData.title.trim()==''||this.quizData.title==null){
      this.snak.open('Title Required','OK',{duration:3000});
      return;
    }
    if(this.quizData.description.trim()==''||this.quizData.description==null){
      this.snak.open('Description is Required','OK',{duration:3000});
      return;
    }
    if(this.quizData.maxMarks.trim()==''||this.quizData.description==null){
      this.snak.open('Max marks is Required','OK',{duration:3000});
      return;
    }
    if(this.quizData.numberOfQuestions.trim()==''||this.quizData.numberOfQuestions==null){
      this.snak.open('No Of Questions is Required','OK',{duration:3000});
      return;
    }
    if(this.quizData.category==''||this.quizData.category==null){
      this.snak.open('Category is Required','OK',{duration:3000});
      return;
    }
    console.log(this.quizData);
    this.quizServie.addQuiz(this.quizData).subscribe(
      (data)=>{
        console.log(data);
        Swal.fire('Added quiz','Successfully Add quiz',"success");
        this.quizData={
          title:'',
          description:'',
          maxMarks:'',
          numberOfQuestions:'',
          active:true,
          category:null
        };
      },
      (error)=>{
        Swal.fire('Server Erorr','Please try again later','error');
      }
    )
  }

}
