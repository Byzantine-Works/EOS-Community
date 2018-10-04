const io = require('socket.io')();
const db = require('./nonce.json')
const fs = require('fs');



io.on('connection', (client) => {
    client.on('user', (data) => {
        // if(!db[data[0]]) db[data[0]] = 0;
        console.log(db)
        db.nonce ++;
        fs.writeFileSync('./nonce.json', JSON.stringify(db), 'utf8');
        client.emit(data[1], db.nonce);
        console.log(db);
        

    });
});

const port = 8000;
io.listen(port);
console.log('listening on port ', port);