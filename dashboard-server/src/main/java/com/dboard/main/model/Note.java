package com.dboard.main.model;

import org.hibernate.annotations.Type;

import javax.persistence.*;
import javax.validation.constraints.Size;

@Entity
@Table(name = "notes")
public class Note extends UserDateAudit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(max = 140)
    private String title;

    @Column(columnDefinition = "text")
    private String body;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "widget_id", referencedColumnName = "id")
    private Widget widget;

    @Column(name = "web_key")
    private Long webKey;

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
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

    @Override
    public String toString() {
        return title + ": " + body + " in " + widget.getClientId();
    }
}
