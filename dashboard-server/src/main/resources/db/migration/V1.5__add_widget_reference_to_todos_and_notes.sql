ALTER TABLE notes
    ADD widget_id bigint(20) NOT NULL;
ALTER TABLE notes
    ADD CONSTRAINT FK_note_widget
        FOREIGN KEY (widget_id) REFERENCES widgets(id);

ALTER TABLE todos
    ADD widget_id bigint(20) NOT NULL;
ALTER TABLE todos
    ADD CONSTRAINT FK_todo_widget
        FOREIGN KEY (widget_id) REFERENCES todos(id);

ALTER TABLE todos
    ADD web_key bigint(20) NOT NULL;