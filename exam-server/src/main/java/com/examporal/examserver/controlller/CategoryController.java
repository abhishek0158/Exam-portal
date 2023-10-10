package com.examporal.examserver.controlller;

import com.examporal.examserver.models.exam.Category;
import com.examporal.examserver.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/category")
@CrossOrigin("*")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @PostMapping("/")
    public ResponseEntity<?> addCategory(@RequestBody Category category)
    {
        return new ResponseEntity<>(categoryService.addCategory(category), HttpStatus.OK);
    }

    @GetMapping("/{categoryId}")
    public Category getCategory(@PathVariable("categoryId") Long categoryId)
    {
        return this.categoryService.getCategory(categoryId);
    }

    @GetMapping("/")
    public ResponseEntity<?> getCategories(){
        return new ResponseEntity<>(categoryService.getCategories(),HttpStatus.OK);
    }

    @PutMapping("/")
    public Category updateCategory(@RequestBody Category category){
        return categoryService.updateCategory(category);
    }

    @DeleteMapping("/{categoryId}")
    public void deleteCategory(@PathVariable("categoryId") Long categoryId)
    {
        categoryService.deleteCategory(categoryId);
    }


}
