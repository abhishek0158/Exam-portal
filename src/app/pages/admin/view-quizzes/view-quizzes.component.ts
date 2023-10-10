import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {
  quizzes:any;
    constructor(private quiz:QuizService){

    }
  ngOnInit(): void {
    this.quiz.getQuizzes().subscribe(
      (data)=>{
        console.log('from getQuiz()',data);
        this.quizzes=data;
      },
    (error)=>{
      Swal.fire('Internal Server Error','Something went wrong ! please try again later!!',"error")
    }
    )
  } 
  deleteQuiz(qId:number,title:string){
    console.log(qId)
    //Swal.fire('Are you sure want to delete',title,"question")
    //Swal.fire({'Delete','Are you sure you want to Delete?',icon:"question",showCancelButton:true})
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    })
    .then(
      (result)=>{
        console.log(result)
        if(result.isConfirmed){
          this.quiz.deleteQuiz(qId).subscribe(()=>{
            this.quizzes=this.quizzes.filter((quiz:any)=>quiz.qId!=qId);
            Swal.fire('Deleted',title+' succesfully Deleted',"success");
          },(error)=>{
            Swal.fire('Internal Server Error','Server Error Try again later',"error");
          })
        }
      }
    )
  
    //this.quiz.deleteQuiz(qId)
  }
    

}
