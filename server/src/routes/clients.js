const express = require("express");
const mysql = require("mysql2/promise");
const DB_CONFIG = require("../db-config");
const jwt = require("jsonwebtoken");
const { authenticate } = require("../middleware");
const Joi = require("joi");

const router = express.Router();
const dbPool = mysql.createPool(DB_CONFIG);

const userScema = Joi.object({
  full_name: Joi.string().trim().required(),
  email: Joi.string().email().trim().lowercase().required(),
  date_of_birth: Joi.required(),
});

router.get("/", authenticate, async (req, res) => {
  try {
    const [data] = await dbPool.execute(
      "SELECT * FROM clients WHERE users_id = ?",
      [req.user.id],
    );

    res.status(201).send(data);
  } catch (err) {
    console.log(err);
    res.status(500).end;
  }
});

router.post("/", authenticate, async (req, res) => {
  let payload = req.body;

  try {
    payload = await userScema.validateAsync(payload);
  } catch (err) {
    console.log(err);
    return res.status(400).send({ Error: "Mistake in registration" });
  }

  try {
    const [data] = await dbPool.execute(
      "INSERT INTO clients (full_name, email, date_of_birth, users_id) VALUES(?,?,?,?)",
      [payload.full_name, payload.email, payload.date_of_birth, req.user.id],
    );

    res.status(201).send(data);
  } catch (err) {
    console.group(err);

    res.status(500).end;
  }
});

router.delete("/:id", authenticate, async (req, res) => {
  const payload = req.body;
  try {
    const [data] = await dbPool.execute("DELETE FROM clients WHERE id = ?", [
      req.params.id,
    ]);
    res.status(201).send(data);
  } catch (err) {
    console.error(err);
    res.status(500).end;
  }
});

router.put("/:id", authenticate, async (req, res) => {
  let payload = req.body;

  try {
    payload = await userScema.validateAsync(payload);
  } catch (err) {
    console.log(err);
    return res.status(400).send({ Error: "Mistake in registration" });
  }

  try {
    const [data] = await dbPool.execute(
      "UPDATE clients SET full_name = ?, email = ?, date_of_birth = ?  WHERE id = ?",
      [payload.full_name, payload.email, payload.date_of_birth, req.params.id],
    );
    res.status(201).send(data);
  } catch (err) {
    console.group(err);
    res.status(500).end;
  }
});

module.exports = router;
