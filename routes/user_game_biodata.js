var express = require("express");
var router = express.Router();

const {
  user_game,
  user_game_history,
  user_game_biodata,
} = require("../models");

/* GET users listing. */

router.post("/", (req, res, next) => {
  const { address, city, UserId } = req.body;
  user_game_biodata
    .create({
      address,
      city,
      UserId,
    })
    .then((user_game_biodata) => {
      res.json({ message: "Create success", data: user_game_biodata });
    });
});

router.get("/", (req, res, next) => {
  user_game_biodata.findAll().then((user_game_biodata) => {
    res.json({ message: "fetch all success", data: user_game_biodata });
  });
});

// ss
router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  user_game_biodata.findOne({ where: { id: id } }).then((user_game_biodata) => {
    res.json({ message: "fetch success", data: user_game_biodata });
  });
});

router.put("/:id", (req, res, next) => {
  const { id } = req.params;
  const { address, city } = req.body;
  user_game_biodata
    .update(
      {
        address,
        city,
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
  user_game_biodata
    .destroy({ where: { id: id } })
    .then(() => {
      res.json({ message: "delete success" });
    })
    .catch((err) => {
      res.json({ message: "delete failed" });
    });
});

module.exports = router;
