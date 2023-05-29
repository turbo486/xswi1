package cz.osu.xswi1backend.repository;

import cz.osu.xswi1backend.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByOrderByNameAsc();

    List<Task> findByOrderByNameDesc();
}