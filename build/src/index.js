"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _client = require("@prisma/client");
var _cors = _interopRequireDefault(require("cors"));
var _express = _interopRequireDefault(require("express"));
var _users = _interopRequireDefault(require("./routes/users"));
var prisma = new _client.PrismaClient();
var app = (0, _express["default"])();
app.use((0, _cors["default"])());
app.use(_express["default"].urlencoded({
  extended: true
}));
app.use(_express["default"].json());
app.get("/", function (req, res) {
  res.json({
    message: "hello world"
  });
});
app.use("/api", _users["default"]);
app.get("/users", /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var users;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return prisma.user.findMany();
        case 3:
          users = _context2.sent;
          if (!(users.length === 0)) {
            _context2.next = 6;
            break;
          }
          return _context2.abrupt("return", res.status(400).json({
            ok: false,
            message: "list users are empty"
          }));
        case 6:
          return _context2.abrupt("return", res.json({
            ok: true,
            data: users
          }));
        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](0);
          res.status(500).json({
            ok: false,
            error: "Something went wrong!"
          });
        case 12:
          _context2.prev = 12;
          /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
            return _regenerator["default"].wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return prisma.$disconnect();
                case 2:
                  return _context.abrupt("return", _context.sent);
                case 3:
                case "end":
                  return _context.stop();
              }
            }, _callee);
          }));
          return _context2.finish(12);
        case 15:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 9, 12, 15]]);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
app.get("/users/:id", /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var user;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return prisma.user.findUnique({
            where: {
              user_id: Number(req.params.id)
            }
          });
        case 3:
          user = _context4.sent;
          if (!user) {
            _context4.next = 6;
            break;
          }
          return _context4.abrupt("return", res.json({
            ok: true,
            data: user
          }));
        case 6:
          return _context4.abrupt("return", res.status(400).json({
            ok: false,
            message: "User not exist"
          }));
        case 9:
          _context4.prev = 9;
          _context4.t0 = _context4["catch"](0);
          res.status(500).json({
            ok: false,
            error: "Something went wrong!"
          });
        case 12:
          _context4.prev = 12;
          /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
            return _regenerator["default"].wrap(function _callee3$(_context3) {
              while (1) switch (_context3.prev = _context3.next) {
                case 0:
                  _context3.next = 2;
                  return prisma.$disconnect();
                case 2:
                  return _context3.abrupt("return", _context3.sent);
                case 3:
                case "end":
                  return _context3.stop();
              }
            }, _callee3);
          }));
          return _context4.finish(12);
        case 15:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 9, 12, 15]]);
  }));
  return function (_x3, _x4) {
    return _ref3.apply(this, arguments);
  };
}());
app.post("/users", /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var user, userNew;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          if (!(!req.body.name || !req.body.email)) {
            _context6.next = 3;
            break;
          }
          return _context6.abrupt("return", res.status(400).json({
            ok: false,
            message: "Please enter data"
          }));
        case 3:
          _context6.next = 5;
          return prisma.user.findUnique({
            where: {
              email: req.body.email
            }
          });
        case 5:
          user = _context6.sent;
          if (!user) {
            _context6.next = 10;
            break;
          }
          return _context6.abrupt("return", res.status(400).json({
            ok: false,
            message: "Email was exist"
          }));
        case 10:
          _context6.next = 12;
          return prisma.user.create({
            data: {
              name: req.body.name,
              email: req.body.email,
              address: req.body.address
            }
          });
        case 12:
          userNew = _context6.sent;
          return _context6.abrupt("return", res.json({
            ok: true,
            data: userNew
          }));
        case 14:
          _context6.next = 19;
          break;
        case 16:
          _context6.prev = 16;
          _context6.t0 = _context6["catch"](0);
          res.status(500).json({
            ok: false,
            error: "Something went wrong!"
          });
        case 19:
          _context6.prev = 19;
          /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
            return _regenerator["default"].wrap(function _callee5$(_context5) {
              while (1) switch (_context5.prev = _context5.next) {
                case 0:
                  _context5.next = 2;
                  return prisma.$disconnect();
                case 2:
                  return _context5.abrupt("return", _context5.sent);
                case 3:
                case "end":
                  return _context5.stop();
              }
            }, _callee5);
          }));
          return _context6.finish(19);
        case 22:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 16, 19, 22]]);
  }));
  return function (_x5, _x6) {
    return _ref5.apply(this, arguments);
  };
}());
app.put("/users/:id", /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res) {
    var user;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          if (req.body.name) {
            _context8.next = 3;
            break;
          }
          return _context8.abrupt("return", res.status(400).json({
            ok: false,
            message: "Please enter data"
          }));
        case 3:
          _context8.next = 5;
          return prisma.user.update({
            where: {
              user_id: Number(req.params.id)
            },
            data: {
              name: req.body.name
            }
          });
        case 5:
          user = _context8.sent;
          return _context8.abrupt("return", res.json({
            ok: true,
            data: user
          }));
        case 9:
          _context8.prev = 9;
          _context8.t0 = _context8["catch"](0);
          console.log(_context8.t0);
          res.status(500).json({
            ok: false,
            error: "Something went wrong!"
          });
        case 13:
          _context8.prev = 13;
          /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7() {
            return _regenerator["default"].wrap(function _callee7$(_context7) {
              while (1) switch (_context7.prev = _context7.next) {
                case 0:
                  _context7.next = 2;
                  return prisma.$disconnect();
                case 2:
                  return _context7.abrupt("return", _context7.sent);
                case 3:
                case "end":
                  return _context7.stop();
              }
            }, _callee7);
          }));
          return _context8.finish(13);
        case 16:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[0, 9, 13, 16]]);
  }));
  return function (_x7, _x8) {
    return _ref7.apply(this, arguments);
  };
}());
app["delete"]("/users/:id", /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(req, res) {
    var user, userDelete;
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          _context10.next = 3;
          return prisma.user.findUnique({
            where: {
              user_id: Number(req.params.id)
            }
          });
        case 3:
          user = _context10.sent;
          if (user) {
            _context10.next = 6;
            break;
          }
          return _context10.abrupt("return", res.status(400).json({
            ok: false,
            message: "User not exist"
          }));
        case 6:
          _context10.next = 8;
          return prisma.user["delete"]({
            where: {
              user_id: Number(req.params.id)
            }
          });
        case 8:
          userDelete = _context10.sent;
          return _context10.abrupt("return", res.json({
            ok: true,
            message: "Delete success"
          }));
        case 12:
          _context10.prev = 12;
          _context10.t0 = _context10["catch"](0);
          console.log(_context10.t0);
          res.status(500).json({
            ok: false,
            error: "Something went wrong!"
          });
        case 16:
          _context10.prev = 16;
          /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9() {
            return _regenerator["default"].wrap(function _callee9$(_context9) {
              while (1) switch (_context9.prev = _context9.next) {
                case 0:
                  _context9.next = 2;
                  return prisma.$disconnect();
                case 2:
                  return _context9.abrupt("return", _context9.sent);
                case 3:
                case "end":
                  return _context9.stop();
              }
            }, _callee9);
          }));
          return _context10.finish(16);
        case 19:
        case "end":
          return _context10.stop();
      }
    }, _callee10, null, [[0, 12, 16, 19]]);
  }));
  return function (_x9, _x10) {
    return _ref9.apply(this, arguments);
  };
}());
var port = 8080;
app.listen(port, function () {
  console.log("Server is listening on port ".concat(port));
});