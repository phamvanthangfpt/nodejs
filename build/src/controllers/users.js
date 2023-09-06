"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUsers = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var getUsers = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
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
  return function getUsers() {
    return _ref.apply(this, arguments);
  };
}();
exports.getUsers = getUsers;