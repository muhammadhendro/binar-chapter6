var express = require("express");
var router = express.Router();

const { Article, user_game } = require("../models");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/article", (req, res, next) => {
  const { title, body } = req.body;
  Article.create({
    title: title,
    body: body,
    approved: false,
  }).then((article) => {
    res.json({ message: "Create success", data: article });
  });
});

router.get("/article", (req, res, next) => {
  Article.findAll({ include: [{ model: user_game, as: "user" }] }).then(
    (article) => {
      res.json({ message: "fetch all success", data: article });
    }
  );
});

router.get("/article/:id", (req, res, next) => {
  const { id } = req.params;
  Article.findOne({ where: { id: id } }).then((article) => {
    res.json({ message: "fetch success", data: article });
  });
});

router.put("/article/:id", (req, res, next) => {
  const { id } = req.params;
  const { title, body, approved } = req.body;
  Article.update(
    {
      title,
      body,
      approved,
    },
    { where: { id: id } }
  )
    .then(() => {
      res.json({ message: "update success" });
    })
    .catch((err) => {
      res.json({ message: "update failed" });
    });
});

router.delete("/article/:id", (req, res, next) => {
  const { id } = req.params;
  Article.destroy({ where: { id: id } })
    .then(() => {
      res.json({ message: "delete success" });
    })
    .catch((err) => {
      res.json({ message: "delete failed" });
    });
});

router.get("/views/article/create", (req, res) => {
  res.render("article/form");
});

router.get("/views/article/showAll", (req, res) => {
  Article.findAll().then((article) => {
    res.render("article/show", { article });
  });
});

router.get("/views/article/show/:id", (req, res) => {
  const { id } = req.params;
  Article.findOne({ where: { id } }).then((article) => {
    res.render("article/showOne", { article });
  });
});

module.exports = router;
