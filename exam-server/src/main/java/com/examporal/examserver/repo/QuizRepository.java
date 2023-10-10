package com.examporal.examserver.repo;

import com.examporal.examserver.models.exam.Category;
import com.examporal.examserver.models.exam.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuizRepository extends JpaRepository<Quiz,Long> {
    List<Quiz> findByCategory(Category category);

     List<Quiz> findByActive(Boolean b);

     List<Quiz> findByCategoryAndActive(Category category,Boolean b);
}
