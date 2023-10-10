package com.examporal.examserver.service;

import com.examporal.examserver.models.exam.Category;
import com.examporal.examserver.models.exam.Quiz;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Set;

public interface QuizService {
    public Quiz addQuiz(Quiz quiz);
    public Quiz updateQuiz(Quiz quiz);
    public Set<Quiz> getQuizzes();
    public Quiz getQuiz(Long quizId);
    public void deleteQuiz(Long quizId);

   List<Quiz> getQuizzesOfCategory(Category category);

   public List<Quiz> getActiveQuizzes();
   public List<Quiz> getActiveQuizzesOfCategory(Category category);
}
