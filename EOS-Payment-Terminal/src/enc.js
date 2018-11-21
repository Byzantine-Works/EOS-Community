import Config from './config.json';
var crypto = require('crypto');
    
    
    const encrypt = (nonce, prvtK) => {
        var iv = Buffer.from('0000000000000000');
        nonce++;
        let key = Config.saltKey;
        let message = nonce.toString()+' '+prvtK;
        var cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
        return cipher.update(message, 'utf8', 'hex') + cipher.final('hex');
    };
    
    export default encrypt;
