CREATE TABLE notes (
   id bigint(20) NOT NULL,
   title varchar(140),
   body text,
   created_by bigint(20) NOT NULL,
   created_at datetime NOT NULL,
   updated_at datetime NOT NULL,
   PRIMARY KEY (id),
   FOREIGN KEY (created_by) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE todos (
       id bigint(20) NOT NULL,
       title varchar(140),
       checked boolean,
       created_by bigint(20) NOT NULL,
       created_at datetime NOT NULL,
       updated_at datetime NOT NULL,
       PRIMARY KEY (id),
       FOREIGN KEY (created_by) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;