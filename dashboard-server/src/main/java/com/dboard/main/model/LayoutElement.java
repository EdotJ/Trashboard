package com.dboard.main.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
@Table(name = "layout_elements")
public class LayoutElement extends UserDateAudit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String webKey;

    private int w;

    private int h;

    private int x;

    private int y;

    @Column(name = "min_h")
    private int minH;

    @Column(name = "min_w")
    private int minW;

    private Boolean isStatic;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "breakpoint_id", referencedColumnName = "id")
    private Breakpoint breakpoint;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getWebKey() {
        return webKey;
    }

    public void setWebKey(String webKey) {
        this.webKey = webKey;
    }

    public int getW() {
        return w;
    }

    public void setW(int w) {
        this.w = w;
    }

    public int getH() {
        return h;
    }

    public void setH(int h) {
        this.h = h;
    }

    public int getX() {
        return x;
    }

    public void setX(int x) {
        this.x = x;
    }

    public int getY() {
        return y;
    }

    public void setY(int y) {
        this.y = y;
    }

    public int getMinH() {
        return minH;
    }

    public void setMinH(int minH) {
        this.minH = minH;
    }

    public int getMinW() {
        return minW;
    }

    public void setMinW(int minW) {
        this.minW = minW;
    }

    public Boolean getStatic() {
        return isStatic;
    }

    public void setStatic(Boolean aStatic) {
        isStatic = aStatic;
    }

    @JsonIgnore
    public Breakpoint getBreakpoint() {
        return breakpoint;
    }

    public void setBreakpoint(Breakpoint breakpoint) {
        this.breakpoint = breakpoint;
    }
}
