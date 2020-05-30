package com.dboard.main.model;

import javax.persistence.*;
import javax.validation.constraints.Size;

@Entity
@Table(name = "todos")
public class Todo extends UserDateAudit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(max = 140)
    private String title;

    private boolean checked;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "widget_id", referencedColumnName = "id")
    private Widget widget;

    private Long webKey;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public boolean isChecked() {
        return checked;
    }

    public void setChecked(boolean checked) {
        this.checked = checked;
    }

    public Long getId() {
        return id;
    }

    public Widget getWidget() {
        return widget;
    }

    public void setWidget(Widget widget) {
        this.widget = widget;
    }

    public Long getWebKey() {
        return webKey;
    }

    public void setWebKey(Long webKey) {
        this.webKey = webKey;
    }
}
