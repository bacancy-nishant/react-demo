const path = require("path");

console.log("path",path.dirname(require.main.filename));

module.exports = path.dirname(require.main.filename);