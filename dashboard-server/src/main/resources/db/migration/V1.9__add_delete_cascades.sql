ALTER TABLE todos
    DROP FOREIGN KEY FK_todo_widget;

ALTER TABLE todos
    ADD CONSTRAINT FK_todo_widget
        FOREIGN KEY (widget_id)
            REFERENCES widgets(id)
            ON DELETE CASCADE;

ALTER TABLE notes
    DROP FOREIGN KEY FK_note_widget;

ALTER TABLE notes
    ADD CONSTRAINT FK_note_widget
        FOREIGN KEY (widget_id)
            REFERENCES widgets(id)
            ON DELETE CASCADE;