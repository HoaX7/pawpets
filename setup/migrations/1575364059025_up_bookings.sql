CREATE TABLE IF NOT EXISTS booking(
    bid serial, pid integer, checkin timestamp without time zone,
    checkout timestamp without time zone, totalfee varchar(255), created_at TIMESTAMP DEFAULT NOW() NOT NULL 
    );