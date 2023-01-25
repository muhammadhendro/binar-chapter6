var express = require("express");
var router = express.Router();

const {
  user_game,
  user_game_history,
  user_game_biodata,
} = require("../models");

/* GET users listing. */

router.post("/", (req, res, next) => {
  const { username, password } = req.body;
  user_game
    .create({
      username,
      password,
    })
    .then((user_game) => {
      res.json({ message: "Create success", data: user_game });
    });
});

router.get("/", (req, res, next) => {
  user_game
    .findAll({ include: ["history", "userBiodata"] })
    .then((user_game) => {
      res.json({ message: "fetch all success", data: user_game });
    });
});

// ss
router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  user_game.findOne({ where: { id: id } }).then((user_game) => {
    res.json({ message: "fetch success", data: user_game });
  });
});

router.put("/:id", (req, res, next) => {
  const { id } = req.params;
  const { username, password } = req.body;
  user_game
    .update(
      {
        username,
        password,
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

router.delete("/:id", (req, res, next) => {
  const { id } = req.params;
  user_game
    .destroy({ where: { id: id } })
    .then(() => {
      res.json({ message: "delete success" });
    })
    .catch((err) => {
      res.json({ message: "delete failed" });
    });
});

module.exports = router;
