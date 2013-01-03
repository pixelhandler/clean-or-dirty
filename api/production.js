// production.js

// cd /var/www/api/
// forever start -l forever.log -o out.log -e err.log production.js
// forever stop production.js
// forever list

var deployd = require('/usr/local/lib/node_modules/deployd');

var server = deployd({
    port: 8080, 
    env: 'production'
});
/*
var server = deployd({
    port: process.env.PORT || 5000,
    env: 'production',
    db: {
        host: 'my.production.mongo.host', //'127.0.0.1'
        port: 27017, //5759,
        name: '-deployd',
        credentials: {
            username: 'username',
            password: 'password'
        }
    }
});
*/

server.listen();

server.on('listening', function () {
    console.log("Server is listening");
});

server.on('error', function (err) {
    console.error(err);
    process.nextTick(function () { // Give the server a chance to return an error
        process.exit();
    });
});