import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit{

  qId:any;
  quiz:any;
  questions:any;
  constructor(private _route:ActivatedRoute,private _quizService:QuizService,private _router:Router,private _questionServie:QuestionService){

  }

  ngOnInit(): void {
      this.qId=this._route.snapshot.params['qId'];
      this._quizService.getQuiz(this.qId)
      .subscribe((data)=>{
        this.quiz=data;
        console.log(this.quiz);
      },(err)=>{
        Swal.fire('Server Error','Please try again later',"error");
      })

      this._questionServie.getQuizQuestionForUser(this.qId)
      .subscribe(
        (data)=>{
          this.questions=data;
        },
        (e)=>{
          Swal.fire('Server Error','Please try again later','error');
        }
      )
      
  }

  startQuiz(){
    Swal.fire({title:'Are you sure you want to start quiz',confirmButtonText:'Start '+this.quiz.title+' Quiz',
      icon:'question',showCancelButton:true})
      .then((value)=>{
        if(value.isConfirmed){

          if(this.questions.length>0){
            this._router.navigate(['/start/'+this.quiz.qId]);
          }
          else{
            Swal.fire('Empty Quiz','No Questions in Quiz','error');
          }
        }
      })
  }

}
