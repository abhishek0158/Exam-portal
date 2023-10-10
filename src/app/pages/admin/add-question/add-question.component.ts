import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit{

  public Editor:any = ClassicEditor;

  qId:any;
  title:any;
  question:any={
    quiz:{

    },
    content:'',
    option1:'',
    option2:'',
    option3:'',
    option4:'',
    answer:''
  }

  constructor(private _route:ActivatedRoute,private _questionService:QuestionService){

  }

  ngOnInit(): void {
    this.qId=this._route.snapshot.params['qid'];
    this.title=this._route.snapshot.params['title']
    this.question.quiz['qId']=this.qId;
    console.log(this.qId)
  }
  addQuestion(){
    console.log(this.question);
    if(this.question.content.trim()==''||this.question.content===null){
      return;
    }
    if(this.question.option1.trim()==''||this.question.option1===null){
      return;
    }
    if(this.question.option2.trim()==''||this.question.option2===null){
      return;
    }
    if(this.question.answer.trim()==''||this.question.answer===null){
      return;
    }

    this._questionService.addQuestion(this.question)
    .subscribe((data)=>{
        Swal.fire('Success','Question Added',"success");
        this.question={
          quiz:{
      
          },
          content:'',
          option1:'',
          option2:'',
          option3:'',
          option4:'',
          answer:''
        }
    },(error)=>{
      Swal.fire('Error','Question connot be added','error')
    })
  }
}
