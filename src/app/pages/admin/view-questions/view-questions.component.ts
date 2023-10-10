import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-questions',
  templateUrl: './view-questions.component.html',
  styleUrls: ['./view-questions.component.css']
})
export class ViewQuestionsComponent implements OnInit{

  qId:number | any;
  title:String|any;
  questions:any;
  
  constructor(private questionService:QuestionService, private route:ActivatedRoute){

  }
  ngOnInit(): void {
    this.qId=this.route.snapshot.params['id'];
    this.title=this.route.snapshot.params['title'];
    this.questionService.getQuizQuestion(this.qId)
    .subscribe((data)=>{
      console.log(data);
      this.questions=data;
    
    },(error)=>{
      console.log(error);
    })
  }
  deleteQuestion(questionId:any){

    Swal.fire({title:'Want to Delete ?',html:'Are you sure you want to delete question',icon:'warning',cancelButtonText:'cancel',showCancelButton:true,cancelButtonColor:'red'})
    //Swal.fire('Want to Delete ?','Are you sure you want to delete question','warning')
    .then((value)=>{
      if(value.isConfirmed){
        this.questionService.deleteQuestion(questionId)
    .subscribe((data)=>{
         this.questions= this.questions.filter((v:any)=>v.quesId!=questionId)
          Swal.fire('Deleted','Question Successfully Deleted','success');
        },
        (error)=>{
          Swal.fire('Cannot Delete','Cannot Delete , Please Try Again Later','error');
        })
      }
    });
    
  }


}
