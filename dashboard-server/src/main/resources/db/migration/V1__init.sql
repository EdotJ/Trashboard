DROP TABLE IF EXISTS user_roles, users, roles;

CREATE TABLE roles (
    id bigint(20) NOT NULL AUTO_INCREMENT,
    name varchar(60) NOT NULL,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE users (
                       id bigint(20) NOT NULL AUTO_INCREMENT,
                       created_at datetime NOT NULL,
                       updated_at datetime NOT NULL,
                       email varchar(40) NOT NULL,
                       password varchar(100) NOT NULL,
                       username varchar(15) NOT NULL,
                       PRIMARY KEY (id),
                       UNIQUE KEY UK_username (username),
                       UNIQUE KEY UK_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE user_roles (
                            user_id bigint(20) NOT NULL,
                            role_id bigint(20) NOT NULL,
                            PRIMARY KEY (user_id, role_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO roles(name) VALUES('ROLE_USER'), ('ROLE_ADMIN');