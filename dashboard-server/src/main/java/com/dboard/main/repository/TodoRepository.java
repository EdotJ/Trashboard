package com.dboard.main.repository;

import com.dboard.main.model.Todo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TodoRepository extends JpaRepository<Todo, Long> {
    Optional<Todo> findById(Long todoId);

    List<Todo> findByCreatedBy(Long userId);

    long countByCreatedBy(Long userId);

    List<Todo> findByIdIn(List<Long> todoIds);

    List<Todo> findByIdIn(List<Long> todoIds, Sort sort);

    Optional<Todo> findByWebKeyAndCreatedBy(Long webKey, Long userId);
}
