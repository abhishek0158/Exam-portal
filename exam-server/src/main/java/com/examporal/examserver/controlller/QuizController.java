package com.examporal.examserver.controlller;

import com.examporal.examserver.models.exam.Category;
import com.examporal.examserver.models.exam.Quiz;
import com.examporal.examserver.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/quiz")
public class QuizController {

    @Autowired
    private QuizService quizService;

    @PostMapping("/")
    public ResponseEntity<Quiz> add(@RequestBody Quiz quiz)
    {
        return ResponseEntity.ok(quizService.addQuiz(quiz));
    }

    @PutMapping("/")
    public ResponseEntity<Quiz> update(@RequestBody Quiz quiz){
        return ResponseEntity.ok(quizService.updateQuiz(quiz));
    }

    @GetMapping("/")
    public ResponseEntity<?> quizzes(){
        return ResponseEntity.ok(quizService.getQuizzes());
    }

    @GetMapping("/{gid}")
    public Quiz getQuiz(@PathVariable("gid") Long qid)
    {
        return quizService.getQuiz(qid);
    }

    @DeleteMapping("/{qid}")
    public void deleteQuiz(@PathVariable("qid") Long qid){
            quizService.deleteQuiz(qid);
    }
    @GetMapping("/category/{cid}")
    public ResponseEntity<?> getQuizzesOfCategory(@PathVariable("cid") Long cid)
    {
        Category category=new Category();
        category.setCid(cid);
        return new ResponseEntity<>( quizService.getQuizzesOfCategory(category), HttpStatus.OK);
    }

    @GetMapping("/active")
    public List<Quiz> getActiveQuizzes(){
        return quizService.getActiveQuizzes();
    }

    @GetMapping("/category/active/{cid}")
    public  List<Quiz> getActiveQuizzesOfCategory(@PathVariable("cid") Long cid){
        Category category=new Category();
        category.setCid(cid);
        return this.quizService.getActiveQuizzesOfCategory(category);
    }

}
