import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit{
  constructor(private _route:ActivatedRoute,private _quiz:QuizService,
    private _category:CategoryService,
    private snack:MatSnackBar,
    private _router:Router){

  }
  qId:number=0;
  quizData:any={
    title:'',
    description:'',
    maxMarks:'',
    numberOfQuestions:'',
    active:true,
    category:null
  };
  categories:any;
  ngOnInit(): void {
    this.qId=this._route.snapshot.params['qid'];
    this._quiz.getQuiz(this.qId).subscribe(
      (data)=>{
        this.quizData=data;
      },
      (error)=>{
        console.log(error);
      }
    ),
    this._category.categories().subscribe(
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
  updateQuiz(){
    console.log(this.quizData);
    if(this.quizData.title.trim()==''||this.quizData.title==null){
      this.snack.open('Title Required','OK',{duration:3000});
      return;
    }
    if(this.quizData.description.trim()==''||this.quizData.description==null){
      this.snack.open('Description is Required','OK',{duration:3000});
      return;
    }
    if(this.quizData.maxMarks.trim()==''||this.quizData.description==null){
      this.snack.open('Max marks is Required','OK',{duration:3000});
      return;
    }
    if(this.quizData.numberOfQuestions.trim()==''||this.quizData.numberOfQuestions==null){
      this.snack.open('No Of Questions is Required','OK',{duration:3000});
      return;
    }
    if(this.quizData.category==''||this.quizData.category==null){
      this.snack.open('Category is Required','OK',{duration:3000});
      return;
    }
    this._quiz.updateQuiz(this.quizData)
    .subscribe((data)=>{
      Swal.fire('Successfully Updated','',"success")
      .then((val)=>{
        this._router.navigate(['/admin/quizzes'])
      })
    },(error)=>{
      Swal.fire('Internal Server Error','Please Try again later',"error");
    })
  }
}
