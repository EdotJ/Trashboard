ALTER TABLE layout_elements
DROP FOREIGN KEY layout_elements_ibfk_1;
ALTER TABLE layout_elements DROP layout_id;

ALTER TABLE layout_elements
ADD breakpoint_id bigint(20) NOT NULL;
ALTER TABLE layout_elements
ADD CONSTRAINT FK_layout_element_breakpoint
FOREIGN KEY (breakpoint_id) REFERENCES breakpoints(id);

DROP TABLE layouts;