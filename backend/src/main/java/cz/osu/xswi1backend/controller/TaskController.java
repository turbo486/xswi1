package cz.osu.xswi1backend.controller;

import cz.osu.xswi1backend.exception.TaskNotFoundException;
import cz.osu.xswi1backend.model.Task;
import cz.osu.xswi1backend.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000/")
public class TaskController {
    @Autowired
    private TaskRepository taskRepository;

    // new task
    @PostMapping("/task")
    Task newTask(@RequestBody Task newTask) {
        return taskRepository.save(newTask);
    }

    // get all tasks
    @GetMapping("/tasks")
    List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    // get all tasks sort by name ascending
    @GetMapping("/tasksasc")
    List<Task> getAllTasksSortByNameAsc(){
        return taskRepository.findByOrderByNameAsc();
    }

    // get all tasks sort by name descending
    @GetMapping("/tasksdesc")
    List<Task> getAllTasksSortByNameDesc(){
        return taskRepository.findByOrderByNameDesc();
    }

    // get task by ID
    @GetMapping("/task/{id}")
    Task getTaskById(@PathVariable Long id) {
        return taskRepository.findById(id)
                .orElseThrow(()->new TaskNotFoundException(id));
    }

    // edit task
    @PutMapping("/task/{id}")
    Task updateTask(@RequestBody Task newTask, @PathVariable Long id){
        return taskRepository.findById(id)
                .map(task -> {
                    task.setName(newTask.getName());
                    task.setDescription(newTask.getDescription());

                    return taskRepository.save(task);
                }).orElseThrow(()-> new TaskNotFoundException(id));
    }

    // delete task
    @DeleteMapping("/task/{id}")
    String deleteTask(@PathVariable Long id) {
        if(!taskRepository.existsById(id)){
            throw new TaskNotFoundException(id);
        }

        taskRepository.deleteById(id);
        return  "Task with ID " + id + " was deleted.";
    }
}
