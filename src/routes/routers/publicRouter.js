"use strict";

const path = require("path");
const router = require("express").Router();
const ctrl = require(path.join(__dirname, "../../controllers"));
const validators = require(path.join(
    __dirname,
    "../../services/validators.js"
));

router.post("/register", validators.register, (req, res, next) =>
    ctrl.User("register", req => [req])(req, res, next)
);
router.post("/login", (req, res, next) =>
    ctrl.Auth("authenticate", (req, res, next) => [req, res, next])(req, res, next)
);

module.exports = router;
