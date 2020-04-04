package com.dboard.main.repository;

import com.dboard.main.model.Note;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface NoteRepository extends JpaRepository<Note, Long> {
    Optional<Note> findById(Long noteId);

    Page<Note> findByCreatedBy(Long userId, Pageable pageable);

    long countByCreatedBy(Long userId);

    List<Note> findByIdIn(List<Long> noteIds);

    List<Note> findByIdIn(List<Long> noteIds, Sort sort);
}
