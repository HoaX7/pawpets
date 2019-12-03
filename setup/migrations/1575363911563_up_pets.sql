CREATE TABLE IF NOT EXISTS pet (
    pid serial PRIMARY KEY, name varchar(255), age integer, type varchar(255), breed varchar(255), cid integer
);