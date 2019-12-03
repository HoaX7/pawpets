# PAWPETS
This is an RDBMS project which helps to manage bookings and other pet details. 

#BASIC SOFTWARE REQUIREMENTS
- POSTGRESQL PG ADMIN 4
- MongoDB (compass community recommended)

#INITIAL SETUP
>git clone https://github.com/HoaX7/pawpets.git

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

## WARNING!!!!
> IT IS NOT RECOMMENDED TO USE SENSITIVE PERSONAL DETAILS AS THIS IS A DEMO APPLICATION AND IS NOT SECURE ENOUGH
> I WILL NOT BE HELD RESPONSIBLE FOR YOUR CARELESSNESS 

## IMPORTANT!
>initially before signing up i recommend you to navigate to "./views/sign.ejs and change the value at line 76 to "Manager" and revert it back once you've signed up as a Manager to handle the rest of the functions efficiently. 



@COPYRIGHT 2019 HOAX-
