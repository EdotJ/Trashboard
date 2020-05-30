CREATE TABLE IF NOT EXISTS  breakpoints (
                                    id bigint(20) NOT NULL AUTO_INCREMENT,
                                    name varchar(20) NOT NULL,
                                    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO breakpoints(name) VALUES('desk'), ('mob');

CREATE TABLE IF NOT EXISTS layouts (
                       id bigint(20) NOT NULL AUTO_INCREMENT,
                       breakpoint_id bigint(20),
                       created_by bigint(20) NOT NULL,
                       created_at datetime NOT NULL,
                       updated_at datetime NOT NULL,
                       PRIMARY KEY (id),
                       FOREIGN KEY (breakpoint_id) REFERENCES breakpoints(id),
                       FOREIGN KEY (created_by) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS layout_elements (
                       id bigint(20) NOT NULL AUTO_INCREMENT,
                       web_key varchar(140),
                       x int(10),
                       y int(10),
                       w int(10),
                       h int(10),
                       layout_id bigint(20) NOT NULL,
                       is_static boolean,
                       created_by bigint(20) NOT NULL,
                       created_at datetime NOT NULL,
                       updated_at datetime NOT NULL,
                       PRIMARY KEY (id),
                       FOREIGN KEY (layout_id) REFERENCES layouts(id),
                       FOREIGN KEY (created_by) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS widgets (
                        id bigint(20) NOT NULL AUTO_INCREMENT,
                        props text(500),
                        type varchar(140),
                        created_by bigint(20) NOT NULL,
                        created_at datetime NOT NULL,
                        updated_at datetime NOT NULL,
                        PRIMARY KEY (id),
                        FOREIGN KEY (created_by) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;