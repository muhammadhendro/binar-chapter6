var express = require("express");
var router = express.Router();

const {
  user_game,
  user_game_history,
  user_game_biodata,
} = require("../models");

/* GET users listing. */

router.post("/", (req, res, next) => {
  const { result, score, userGameId } = req.body;
  user_game_history
    .create({
      result,
      score,
      userGameId,
    })
    .then((user_game_history) => {
      res.json({ message: "Create success", data: user_game_history });
    });
});

router.get("/", (req, res, next) => {
  user_game_history.findAll().then((user_game_history) => {
    res.json({ message: "fetch all success", data: user_game_history });
  });
});

// ss
router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  user_game_history.findOne({ where: { id: id } }).then((user_game_history) => {
    res.json({ message: "fetch success", data: user_game_history });
  });
});

router.put("/:id", (req, res, next) => {
  const { id } = req.params;
  const { result, score } = req.body;
  user_game_history
    .update(
      {
        result,
        score,
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
  user_game_history
    .destroy({ where: { id: id } })
    .then(() => {
      res.json({ message: "delete success" });
    })
    .catch((err) => {
      res.json({ message: "delete failed" });
    });
});

module.exports = router;
