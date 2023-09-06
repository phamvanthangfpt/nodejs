"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _users = require("../controllers/users");
var router = _express["default"].Router();

// middleware that is specific to this router
router.use(function (req, res, next) {
  console.log("Time: ", Date.now());
  next();
});
// define the about route
router.get("/about", _users.getUsers);
var _default = router;
exports["default"] = _default;