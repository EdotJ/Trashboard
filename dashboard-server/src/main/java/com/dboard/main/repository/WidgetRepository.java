package com.dboard.main.repository;

import com.dboard.main.model.Widget;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface WidgetRepository extends JpaRepository<Widget, Long> {
    Optional<Widget> findById(Long widgetId);

    @Query("SELECT w FROM Widget w WHERE w.clientId = :id AND w.createdBy = :createdBy")
    Optional<Widget> findByCreatedByAndAndClientId(@Param("createdBy") Long createdBy, @Param("id") Long clientId);

    Page<Widget> findByCreatedBy(Long userId, Pageable pageable);

    List<Widget> findByCreatedBy(Long userId);

    long countByCreatedBy(Long userId);
}
