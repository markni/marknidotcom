var connect = require('connect');
connect.createServer(
    connect.static('./public')
).listen(8003);
//TODO: port number should be in config files