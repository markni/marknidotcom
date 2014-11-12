var connect = require("connect");
var serveStatic = require('serve-static');

var app = connect();
app.use(serveStatic(__dirname + '/public'));

app.listen(8003);