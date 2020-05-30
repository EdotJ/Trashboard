package com.dboard.main.model;

import org.hibernate.annotations.NaturalId;

import javax.persistence.*;

@Entity
@Table(name="breakpoints")
public class Breakpoint {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @NaturalId
    @Column(length = 60)
    private BreakpointName name;

    public Breakpoint() {
    }

    public Breakpoint(BreakpointName name) {
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BreakpointName getName() {
        return name;
    }

    public void setName(BreakpointName name) {
        this.name = name;
    }
}
