CREATE TABLE IF NOT EXISTS customer(
    cid SERIAL PRIMARY KEY, cusname varchar(255), email varchar(255), phone varchar(10),
    roles varchar(255), gender varchar(255) 
    );