var mysql = require('mysql')
var locals = require('./local')
exports.pool = mysql.createPool(locals.options);