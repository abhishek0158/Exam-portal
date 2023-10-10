package com.examporal.examserver.controlller;

import com.examporal.examserver.models.exam.Question;
import com.examporal.examserver.models.exam.Quiz;
import com.examporal.examserver.service.QuestionService;
import com.examporal.examserver.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/question")
@CrossOrigin("*")
public class QuestionController {

    @Autowired
    private QuestionService questionService;

    @Autowired
    private QuizService quizService;

    @PostMapping("/")
    public ResponseEntity<Question> add(@RequestBody Question question)
    {
        return ResponseEntity.ok(questionService.addQuestion(question));
    }

    @PutMapping("/")
    public ResponseEntity<Question> updateQuestion(@RequestBody Question question){
        return ResponseEntity.ok(questionService.updateQuestion(question));
    }

    @GetMapping("/quiz/{qid}")
    public ResponseEntity<?> getQuestionOfQuiz(@PathVariable("qid") Long qid)
    {
        Quiz quiz=quizService.getQuiz(qid);
        Set<Question> questionSet=quiz.getQuestionSet();
        List list=new ArrayList(questionSet);
        if(list.size()>Integer.parseInt(quiz.getNumberOfQuestions())){
            list=list.subList(0,Integer.parseInt(quiz.getNumberOfQuestions()+1));
        }
        Collections.shuffle(list);
        return ResponseEntity.ok(list);
    }
    @GetMapping("/quiz/all/{qid}")
    public ResponseEntity<?> getQuestionOfQuizAdmin(@PathVariable("qid") Long qid)
    {
        Quiz quiz=quizService.getQuiz(qid);
        Set<Question> questionSet=quiz.getQuestionSet();
        List list=new ArrayList(questionSet);
        return ResponseEntity.ok(list);
    }

    @GetMapping("/{questionId}")
    public Question get(@PathVariable("questionId") Long questionId){
        return questionService.getQuestion(questionId);
    }

    @DeleteMapping("/{questionId}")
    public void delete(@PathVariable("questionId") Long questionId){
         questionService.deleteQuestion(questionId);
    }


    //Evaluate quiz
    @PostMapping("/eval-quiz")
    public ResponseEntity<?> evaluateQuiz(@RequestBody List<Question> questions)
    {
        System.out.println("questions = " + questions);
        Double marksScored= (double) 0;
        Integer correctAnswers=0;
        Integer attempted=0;
        for(Question q:questions){
            if(q.getGivenAnswer()!=null&&this.questionService.get(q.getQuesId()).getAnswer().trim().equals(q.getGivenAnswer().trim())) {
                correctAnswers++;
            }
            if(q.getGivenAnswer()!=null&&q.getGivenAnswer().trim().equals("")==false){
                attempted++;
            }
        };
        marksScored=correctAnswers*(Double)(Double.parseDouble(questions.get(0).getQuiz().getMaxMarks())/questions.size());
        Map map=new HashMap();
        map.put("marksScored",marksScored);
        map.put("correctAnswers",correctAnswers);
        map.put("attempted",attempted);
        return new ResponseEntity<>(map,HttpStatus.OK);
    }

}
