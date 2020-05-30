package com.dboard.main.repository;

import com.dboard.main.model.Note;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface NoteRepository extends JpaRepository<Note, Long> {
    Optional<Note> findById(Long noteId);

    List<Note> findByCreatedBy(Long userId);

    @Query("SELECT n FROM Note n WHERE n.createdBy = :createdBy AND n.webKey = :webKey")
    Optional<Note> findByCreatedByAndWebKey(@Param("createdBy") Long createdBy, @Param("webKey") Long webKey);

    long countByCreatedBy(Long userId);

    List<Note> findByIdIn(List<Long> noteIds);

    List<Note> findByIdIn(List<Long> noteIds, Sort sort);
}
