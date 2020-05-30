package com.dboard.main.payload.Widget.Layout;

import javax.validation.constraints.NotEmpty;

public class RequestLayoutElement {

    @NotEmpty
    private int w;

    @NotEmpty
    private int h;

    @NotEmpty
    private int x;

    @NotEmpty
    private int y;

    @NotEmpty
    private String i;

    @NotEmpty
    private int minW;

    @NotEmpty
    private int minH;

    @NotEmpty
    private String breakpoint;

    private Boolean isStatic;

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

    public String getI() {
        return i;
    }

    public void setI(String i) {
        this.i = i;
    }

    public int getMinW() {
        return minW;
    }

    public void setMinW(int minW) {
        this.minW = minW;
    }

    public int getMinH() {
        return minH;
    }

    public void setMinH(int minH) {
        this.minH = minH;
    }

    public Boolean getStatic() {
        return isStatic;
    }

    public void setStatic(Boolean aStatic) {
        isStatic = aStatic;
    }

    public String getBreakpoint() {
        return breakpoint;
    }

    public void setBreakpoint(String breakpoint) {
        this.breakpoint = breakpoint;
    }
}
