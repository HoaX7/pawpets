# PAWPETS
This is an RDBMS project which helps to manage bookings and other pet details. 

#BASIC SOFTWARE REQUIREMENTS
- POSTGRESQL PG ADMIN 4
- MongoDB (compass community recommended)

#INITIAL SETUP
>git clone https://github.com/HoaX7/pawpets.git

>npm install

--Initial Database Connections
-Set up your postgreSQL PGUSER and PGPASSWORD in .env
-Navigate to the migrate.js and createdb.js and set your database password
-Navigate to your mongodb "data" folder and run mongod

--Creating Database
>npm run dbcreate

--Running migrations
>npm run dbmigrate migrate

>npm run migrate-mongo up

--If you wanna revert migrations
>npm run dbmigrate rollback

>npm run migrate-mongo down

## WARNING!!!!
> IT IS NOT RECOMMENDED TO USE SENSITIVE PERSONAL DETAILS AS THIS IS A DEMO APPLICATION AND IS NOT SECURE ENOUGH
> I WILL NOT BE HELD RESPONSIBLE FOR YOUR CARELESSNESS 
 



@COPYRIGHT 2019 HOAX-
