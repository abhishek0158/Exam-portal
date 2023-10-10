package com.examporal.examserver.service;

import com.examporal.examserver.models.exam.Question;
import com.examporal.examserver.models.exam.Quiz;

import java.util.Set;

public interface QuestionService {

    public Question addQuestion(Question question);
    public Question updateQuestion(Question question);
    public Set<Question> getQuestions();
    public Question getQuestion(Long questionId);
    public Set<Question> getQuestionOfQuiz(Quiz quiz);

    void deleteQuestion(Long questionId);

    public Question get(Long questionId);
}
