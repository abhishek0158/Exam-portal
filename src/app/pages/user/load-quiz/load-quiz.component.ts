import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit{

  catId:any;
  quizzes:any=[];

  constructor(private _route:ActivatedRoute,private _quizService:QuizService){
    
  }

  ngOnInit(): void {
    this._route.params.subscribe((value)=>{
      this.catId=value['catId'];
      console.log(this.catId);
    console.log(typeof(this.catId))
    this._quizService.getActiveQuiz().subscribe(
      (data)=>{
        if(this.catId=='0')
        this.quizzes=data;
        if(this.catId!='0'){
          //Method-1 (Just Use filter )
          //this.quizzes=this.quizzes.filter((q:any)=>q.category.cid==this.catId);
         //Method-2 (Do api call) 
          this._quizService.getActiveQuizzesOfCategory(this.catId)
          .subscribe((data)=>{
            this.quizzes=data;
          },(e)=>{
            Swal.fire('Internal Server Error','Try Again Later','error');
          })
        }
      
      },(e)=>{
        Swal.fire('Internal Server Error','Try Again Later','error');
      }
    )
    
    })
    
  }

}
