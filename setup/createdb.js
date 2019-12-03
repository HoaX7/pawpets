const {createDb} = require("postgres-migrations");
 
// @ COPYRIGHT 2019 CREATED BY HoaX

//DO NOT TAMPER WITH THIS FILE UNLESS YOU KNOW WHAT YOU'RE DOING


console.log('creating database......please wait');
createDb("pawpets", {
  defaultDatabase: "postgres", // optional, default: "postgres"
  user: "postgres",
  password: "", //Database password
  host: "localhost",
  port: 5432,
})
.then(()=> {
    console.log("DATABASE CREATED");
    process.exit();
})
.catch((err) => {
  console.log('DATABASE ALREADY EXISTS');
  process.exit();
});
