DROP TABLE CASCADE;

CREATE TABLE users (
    username PRIMARY KEY VARCHAR(10) NOT NULL ,
    password VARCHAR(50) NOT NULL
)

-- INSERT user VALUES('user1', 'password1', 'time')