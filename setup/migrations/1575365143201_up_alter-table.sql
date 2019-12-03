ALTER TABLE pet ADD CONSTRAINT FK FOREIGN KEY (cid) REFERENCES customer(cid) ON DELETE CASCADE;
ALTER TABLE booking ADD CONSTRAINT FK2 FOREIGN KEY (pid) REFERENCES pet (pid) ON DELETE CASCADE;

CREATE SEQUENCE cus_id_seq;
CREATE SEQUENCE book_id_seq;
CREATE SEQUENCE pet_id_seq;
ALTER TABLE customer ALTER COLUMN cid SET default nextval('cus_id_seq');
ALTER TABLE pet ALTER COLUMN pid SET default nextval('pet_id_seq');
ALTER TABLE booking ALTER COLUMN bid SET default nextval('book_id_seq');