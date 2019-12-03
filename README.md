# PAWPETS
This is an RDBMS project which helps to manage bookings and other pet details. 

#BASIC SOFTWARE REQUIREMENTS
- POSTGRESQL PG ADMIN 4
- MongoDB (compass community recommended)

#INITIAL SETUP
>npm install

--Initial Database Connections
-Set up your postgreSQL PGUSER and PGPASSWORD
-Navigate to the migrate.js and createdb.js and set your database password

--Creating Database
>npm run dbcreate

--Running migrations
>npm run dbmigrate migrate

--If you wanna revert migrations
>npm run dbmigrate rollback
