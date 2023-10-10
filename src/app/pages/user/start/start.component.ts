import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';
import { __values } from 'tslib';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit{

  qId:any;
  questions:any;
  marksScored=0;
  correctAnswers=0;
  attempted=0;
  isSubmit=false;
  timer:any;
  timeLeft:any;
  result:any;
  constructor(private locationSt:LocationStrategy,private _route:ActivatedRoute,private _questionService:QuestionService){}

  ngOnInit(): void {
    this.preventButton();
    this.qId=this._route.snapshot.params['qId'];
    this.loadQuestions();
  }
  loadQuestions(){
    this._questionService.getQuizQuestionForUser(this.qId)
    .subscribe((data)=>{
      console.log(data);
      this.questions=data;
      this.timer=this.questions.length*2*60;
      this.startTimer();
      console.log(this.questions)
    },(err)=>{
      Swal.fire('Server Error','Please try again later',"error");
    })
  }

  preventButton(){
    history.pushState(null,'',location.href);
    this.locationSt.onPopState(()=>{
      history.pushState(null,'',location.href);
    })
  }

  submitQuiz(){
    
    Swal.fire({title:'Are you sure you want to Submit quiz',confirmButtonText:'Submit',
    icon:'question',showCancelButton:true})
    .then(
      (value)=>{
        if(value.isConfirmed){
          this.evaluate();
          
        }
      }
       
    )
  }

  startTimer(){
    let t=window.setInterval(()=>{
      if(this.timer<=0){
        this.evaluate();
        clearInterval(t);
      }
      else{
        this.timer--;
        this.timeLeft=this.getFormattedTime()
      }
    },1000)
  }

  getFormattedTime(){
    let mm=Math.floor(this.timer/60);
    let ss=this.timer-mm*60;
    return `${mm} min : ${ss} sec`
  }
  evaluate(){
    this._questionService.evaluateQuiz(this.questions)
          .subscribe(
            (data)=>{
              console.log(data)
              this.result=data;
              this.result['marksScored']=Number(this.result['marksScored']).toFixed(2)
              this.isSubmit=true
            },(e)=>{
              console.log(e);
            }
          )
   
          // this.questions.forEach(
          //   (q:any)=>{
          //     //score calculation
          //     if(q.givenAnswer===q.answer){
          //       this.correctAnswers++;
          //     }
          //     if(q.givenAnswer.trim()!=''){
          //       this.attempted++;
          //     }
          //   }
          // );
          // this.marksScored=this.correctAnswers*(this.questions[0].quiz.maxMarks/this.questions.length);
          // this.isSubmit=true
  }


  printPage(){
    window.print();
  }
}
