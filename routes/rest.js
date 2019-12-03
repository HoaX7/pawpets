const express = require("express");
const router = express.Router();
const { Client } = require("pg");
const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");

router.get("/bookings", ensureAuthenticated, async (req, res) => {
  if (req.query.bid) {
    let list = [];
    list.user = req.user;
    const client = new Client();
    client.connect();
    list.res1 = await client.query(
      "select * from (select cusname,* from customer c, pet as p, booking as b where p.pid = b.pid and c.cid = p.cid) as s where s.bid = " +
        req.query.bid
    );
    res.render("booking", list);
  }
  if (req.query.oname) {
    let list = [];
    list.user = req.user;
    const client = new Client();
    client.connect();
    list.res1 = await client.query(
      "select * from booking b,pet p,customer c where b.pid = p.pid and p.cid = c.cid and c.cusname ilike " +
        "'%" +
        req.query.oname +
        "%'"
    );
    console.log('query',req.query);
    res.render("booking", list);
  } else {
    let list = [];
    list.user = req.user;
    const client = new Client();
    client.connect();
    if (!req.user.isAdmin) {
      list.res1 = await client.query(
        "select * from booking b,pet p,customer c where b.pid = p.pid and p.cid = c.cid and c.cusname = " +
          "'" +
          req.user.name +
          "'"
      );
    } else {
      list.res1 = await client.query(
        "select * from booking b,pet p,customer c where b.pid = p.pid and p.cid = c.cid"
      );
    }
    res.render("booking", list);
  }
});

router.get("/newBook", ensureAuthenticated, async (req, res) => {
  let list = [];
  list.user = req.user;
  const client = new Client();
  client.connect();
  list.res1 = await client.query("select * from fee");
  // list.res2 = await client.query(
  //   "select cid from customer where cusname = " + "'" + req.user.name + "'"
  // );
  res.render("newBook", list);
});

router.get("/settings", ensureAuthenticated, async (req, res) => {
  let list = [];
  list.user = req.user;
  const client = new Client();
  client.connect();
  list.res1 = await client.query("select * from fee");
  if (req.user.isAdmin) {
    res.render("settings", list);
  } else {
    res.render("404");
  }
});

router.get("/current", ensureAuthenticated, async (req, res) => {
  let list = [];
  list.user = req.user;
  const client = new Client();
  client.connect();
  list.res1 = await client.query(
    "select count(*) totalcount from public.booking where checkout > now() and checkin <= now()"
  );
  list.res2 = await client.query(
    "select count(*) cats from booking b,pet p where b.pid = p.pid and p.type = 'Cat' and checkout > now() and checkin < now()"
  );
  list.res3 = await client.query(
    "select count(*) dogs from booking b,pet p where b.pid = p.pid and p.type = 'Dog' and checkout > now() and checkin < now()"
  );
  if (req.user.isAdmin) {
    res.render("current", list);
  } else {
    res.render("404");
  }
});

router.get("/pets", ensureAuthenticated, async (req, res) => {
  if (req.query.pname) {
    let list = [];
    list.user = req.user;
    const client = new Client();
    client.connect();
    list.res1 = await client.query(
      "select * from (select * from customer c, pet p where p.cid = c.cid) as s where s.name ilike " +
        "'%" +
        req.query.pname +
        "%'"
    );
    res.render("petdetails", list);
  }
  if (req.query.breed) {
    let list = [];
    list.user = req.user;
    const client = new Client();
    client.connect();
    list.res1 = await client.query(
      "select * from (select * from customer c, pet p where p.cid = c.cid) as s where s.breed ilike " +
        "'%" +
        req.query.breed +
        "%'"
    );
    res.render("petdetails", list);
  } else {
    let list = [];
    list.user = req.user;
    console.log(req.body.pid);
    const client = new Client();
    client.connect();
    if (!req.user.isAdmin) {
      list.res1 = await client.query(
        "select * from pet p,customer c where p.cid = c.cid and c.cusname = " +
          "'" +
          req.user.name +
          "'"
      );
    } else {
      list.res1 = await client.query(
        "select *,cusname from pet as p, customer as c where c.cid=p.cid;"
      );
    }
    res.render("petdetails", list);
  }
});

router.get('/pets/edit/:id',ensureAuthenticated, async (req,res)=>{
  list = [];
  list.user = req.user;
  const client = new Client();
  client.connect();
  list.res1 = await client.query('select * from pet where pid ='+ req.params.id);
  res.render('editpets',list);
});

router.get('/bookings/edit/:id',ensureAuthenticated, async (req,res)=>{
  list = [];
  list.user = req.user;
  const client = new Client();
  client.connect();
  list.res1 = await client.query('select * from fee');
  list.res2 = await client.query('select * from booking where bid = '+ req.params.id);
  res.render('editbookings',list);
});

router.get("/users", ensureAuthenticated, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      if (req.query.email) {
        let list = [];
        list.user = req.user;
        const client = new Client();
        client.connect();
        list.res1 = await client.query(
          "select * from customer where email = " + "'" + req.query.email + "'"
        );
        res.render("users", list);
      }
      if (req.query.name) {
        let list = [];
        list.user = req.user;
        const client = new Client();
        client.connect();
        list.res1 = await client.query(
          "select * from customer where cusname ilike " + "'%" + req.query.name + "%'"
        );
        res.render("users", list);
      } else {
        let list = [];
        list.user = req.user;
        const client = new Client();
        client.connect();
        list.res1 = await client.query("SELECT * FROM customer;");
        if (req.user.isAdmin) {
          res.render("users", list);
        }
      }
    } catch (err) {
      res.redirect("/login");
    }
  } else {
    res.render("404");
  }
});

router.get("/profiles", ensureAuthenticated, (req, res) => {
  res.render("profile", {
    user: req.user
  });
});

router.get("/newUser", ensureAuthenticated, (req, res) => {
  try {
    if (req.user.isAdmin) {
      res.render("add", { user: req.user });
    } else {
      res.render("404");
    }
  } catch {
    console.log(err, "error");
  }
});

router.get("/newpets", ensureAuthenticated, async (req, res) => {
  let list = [];
  list.user = req.user;
  const client = new Client();
  client.connect();
  list.res1 = await client.query(
    "SELECT cid FROM customer WHERE cusname =" + "'" + req.user.name + "'"
  );
  res.render("pets", list);
});

module.exports = router;
