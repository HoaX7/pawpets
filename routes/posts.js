const express = require("express");
const router = express.Router();
const { Client } = require("pg");
const methodOverride = require("method-override");
const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");

router.use(methodOverride("_method"));

router.get("/pet/:id", (req, res) => {
  const client = new Client();
  client
    .connect()
    .then(() => {
      const sql = "DELETE FROM pet WHERE pid = $1";
      const params = [req.params.id];
      return client.query(sql, params);
    })
    .then(() => {
      req.flash("error_msg", "Pet Deleted");
      res.redirect("/pets");
    })
    .catch(err => console.log(err));
});

router.get("/book/:id", (req, res) => {
  const client = new Client();
  client
    .connect()
    .then(() => {
      const sql = "DELETE FROM booking WHERE bid = $1";
      const params = [req.params.id];
      return client.query(sql, params);
    })
    .then(() => {
      req.flash("error_msg", "Booking Deleted");
      res.redirect("/bookings");
    })
    .catch(err => console.log(err));
});

router.put("/bookings/edit/:id", async (req, res) => {
  const { pid, arv, dep, fee } = req.body;
  const client = new Client();
  client
    .connect()
    .then(() => {
      const sql =
        "update booking set pid = $1, checkin = $2, checkout = ($3), totalfee = ($4) where bid = " +
        req.params.id;
      const params = [pid, arv, dep, fee];
      return client.query(sql, params);
    })
    .then(updated => {
      req.flash("success_msg", "Update successful");
      res.redirect("/bookings");
    })
    .catch(err => console.log(err));
  req.flash("error_msg", "Error, try again");
  res.redirect("/bookings");
});

router.put('/pets/edit/:id',async (req,res)=>{
  const { type } = req.body;
  if (type == "1") {
    req.body.type = "Dog";
  }
  if (type == "2") {
    req.body.type = "Cat";
  }
  const client = new Client();
  client
    .connect()
    .then(() => {
      const sql =
        "update pet set name = ($1), age = ($2), type = ($3), breed = ($4) where pid = "+req.params.id;
      const params = [
        req.body.pname,
        req.body.age,
        req.body.type,
        req.body.breed
      ];
      return client.query(sql, params);
    })
    .then(pet => {
      req.flash("success_msg", "Update successful");
      res.redirect("/pets");
    })
    .catch(err => {
      req.flash("error_msg", "Something went wrong");
      res.redirect("/pets");
      console.log(err);
    });
});

router.post("/settings", (req, res) => {
  const client = new Client();
  client
    .connect()
    .then(() => {
      const sql = "update fee set fee = $1 where id = 1";
      const params = [req.body.prc];
      return client.query(sql, params);
    })
    .then(pet => {
      req.flash("success_msg", "Update successful");
      res.redirect("/settings");
    })
    .catch(err => console.log(err));
});

router.post("/bookings", async (req, res) => {
  const { pid, arv, dep, fee } = req.body;
  t1 = new Date(arv);
  t2 = new Date(dep);
  today = new Date();
  if (t1 < today) {
    req.flash("error_msg", "Invalid dates");
    res.redirect("/newBook");
  }
  if (req.body.arv > req.body.dep) {
    req.flash("error_msg", "Invalid dates");
    res.redirect("/newBook");
  }
  const client = new Client();
  client
    .connect()
    .then(() => {
      const sql =
        "INSERT INTO booking (pid,checkin,checkout,totalfee) VALUES($1,$2,$3,$4)";
      const params = [pid, t1, t2, fee];
      return client.query(sql, params);
    })
    .then(pet => {
      req.flash("success_msg", "Booking Successful");
      res.redirect("/bookings");
    })
    .catch(err => {
      req.flash("error_msg", "Invalid PetID");
      res.redirect("/newBook");
      console.log(err);
    });
});

router.post("/pets", (req, res) => {
  const { type } = req.body;
  if (type == "1") {
    req.body.type = "Dog";
  }
  if (type == "2") {
    req.body.type = "Cat";
  }
  const client = new Client();
  client
    .connect()
    .then(() => {
      const sql =
        "INSERT INTO pet (name,age,type,breed,cid) VALUES($1,$2,$3,$4,$5)";
      const params = [
        req.body.pname,
        req.body.age,
        req.body.type,
        req.body.breed,
        req.body.cid
      ];
      return client.query(sql, params);
    })
    .then(pet => {
      req.flash("success_msg", "Pet successfully created");
      res.redirect("/pets");
    })
    .catch(err => {
      req.flash("error_msg", "Something went wrong");
      res.redirect("/newpets");
      console.log(err);
    });
});

module.exports = router;
