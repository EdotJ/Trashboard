package com.dboard.main.repository;

import com.dboard.main.model.Breakpoint;
import com.dboard.main.model.BreakpointName;
import com.dboard.main.model.LayoutElement;
import com.dboard.main.model.Widget;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface LayoutRepository extends JpaRepository<LayoutElement, Long> {
    Optional<LayoutElement> findById(Long elementId);

    List<LayoutElement> findByBreakpoint(String breakpoint);

    List<LayoutElement> findByCreatedBy(Long userId);

    List<LayoutElement> findByWebKeyAndCreatedBy(String webKey, Long userId);

    LayoutElement findByCreatedByAndWebKeyAndBreakpointName(Long userId, String webKey, BreakpointName breakpoint);
}
