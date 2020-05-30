package com.dboard.main.repository;

import com.dboard.main.model.Breakpoint;
import com.dboard.main.model.BreakpointName;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BreakpointRepository extends JpaRepository<Breakpoint, Long> {

    public Breakpoint getBreakpointByName(BreakpointName name);
}
