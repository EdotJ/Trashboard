package com.dboard.main.repository;

import com.dboard.main.model.Todo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TodoRepository extends JpaRepository<Todo, Long> {
    Optional<Todo> findById(Long noteId);

    Page<Todo> findByCreatedBy(Long userId, Pageable pageable);

    long countByCreatedBy(Long userId);

    List<Todo> findByIdIn(List<Long> noteIds);

    List<Todo> findByIdIn(List<Long> noteIds, Sort sort);
}
