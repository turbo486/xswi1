package cz.osu.xswi1backend.exception;

public class SubtaskNotFoundException extends RuntimeException{
    public SubtaskNotFoundException(Long id){
        super("Unable to find the subtask with ID " + id);
    }
}
