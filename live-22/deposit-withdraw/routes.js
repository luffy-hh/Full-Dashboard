const express = require("express");
const router = express.Router();
const live22Controller = require("./controllers");

router.post("/deposit", async (req, res) => {
  const { playerId, amount } = req.body;

  const result = await live22Controller.depositFunds(playerId, amount);
  res.json(result);
});

router.post("/withdraw", async (req, res) => {
  const { playerId, amount } = req.body;

  const result = await live22Controller.withdrawFunds(playerId, amount);
  res.json(result);
});

module.exports = router;
