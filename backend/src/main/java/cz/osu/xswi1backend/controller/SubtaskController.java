package cz.osu.xswi1backend.controller;

import cz.osu.xswi1backend.exception.SubtaskNotFoundException;
import cz.osu.xswi1backend.exception.TaskNotFoundException;
import cz.osu.xswi1backend.model.Subtask;
import cz.osu.xswi1backend.model.Task;
import cz.osu.xswi1backend.repository.SubtaskRepository;
import cz.osu.xswi1backend.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.server.DelegatingServerHttpResponse;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000/")
public class SubtaskController {
    @Autowired
    private TaskRepository taskRepository;
    @Autowired
    private SubtaskRepository subtaskRepository;

    // new subtask
    @PostMapping("/task/{taskId}/subtask")
    Subtask newSubtask(@RequestBody Subtask newSubtask, @PathVariable Long taskId) {
        return taskRepository.findById(taskId)
                .map(task -> {
                    newSubtask.setTask(task);
                    return subtaskRepository.save(newSubtask);
                }).orElseThrow(() -> new TaskNotFoundException(taskId));
    }

    // list all subtasks by task ID
    @GetMapping("/task/{taskId}/subtasks")
    List<Subtask> getAllSubtasksByTaskId(@PathVariable Long taskId) {
        return subtaskRepository.findByTaskId(taskId);
    }

    // get task by ID
    @GetMapping("/subtask/{id}")
    Subtask getSubtaskById(@PathVariable Long id) {
        return subtaskRepository.findById(id)
                .orElseThrow(()->new SubtaskNotFoundException(id));
    }

    // edit subtask
    @PutMapping("/subtask/{id}")
    Subtask updateSubtask(@RequestBody Subtask newSubtask, @PathVariable Long id) {
        return subtaskRepository.findById(id)
                .map(subtask -> {
                    subtask.setText(newSubtask.getText());

                    return subtaskRepository.save(subtask);
                }).orElseThrow(()-> new SubtaskNotFoundException(id));
    }

    // delete subtask
    @DeleteMapping("/subtask/{id}")
    String deleteSubtask(@PathVariable Long id) {
        if(!subtaskRepository.existsById(id)) {
            throw new SubtaskNotFoundException(id);
        }

        subtaskRepository.deleteById(id);
        return "Subtask with ID " + id + " was deleted.";
    }
}
