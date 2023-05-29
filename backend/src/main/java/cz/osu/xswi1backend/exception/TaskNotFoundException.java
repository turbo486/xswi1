package cz.osu.xswi1backend.exception;

public class TaskNotFoundException extends RuntimeException{
    public TaskNotFoundException(Long id){
        super("Unable to find the task with ID " + id);
    }
}
