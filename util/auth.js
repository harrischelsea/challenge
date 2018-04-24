const crypto = require('crypto');
const moment = require('moment');
const SECRET = 't4jN451fr4';
const ALGORITHM = 'aes192';
const ENCODING = 'hex';
const UTF8 = 'utf8';

const models = require('../models');

const PROTECTED_ROUTES = [
    '/get-current-user', '/add-link', '/get-all-links'
];


const createCiphered = (message) => {
    let cipher = crypto.createCipher(ALGORITHM, SECRET);
    let ciphered = cipher.update(message, UTF8, ENCODING);
    ciphered += cipher.final(ENCODING);
    return ciphered;
};

const createDeciphered = (cryptedMessage) => {
    let decipher = crypto.createDecipher(ALGORITHM, SECRET);
    let deciphered = decipher.update(cryptedMessage, ENCODING, UTF8);
    deciphered += decipher.final(UTF8);
    return deciphered;
};

const timestampIsExpired = timestamp => !moment(timestamp).isAfter(Date.now());

const extendedTimestamp = () => moment().add(1, 'days').format('YYYY-MM-DD HH:mm');

const refreshToken = username => createCiphered(JSON.stringify({
    username: username,
    timestamp: extendedTimestamp()
}));

const hashPassword = password => {
    let hash = crypto.createHmac('sha512', SECRET);
    hash.update(password);
    return hash.digest(ENCODING);
};

// for a given encrypted token, check it is not expired and if it is valid
const validateAndRefreshToken = async token => {
    try{
        let { username, timestamp } = JSON.parse(createDeciphered(token));
        if (!username || !timestamp) return undefined;
        if (timestampIsExpired(timestamp)) return undefined;
        let user = await models.User.findOne({
            where: { username },
            attributes: [ 'id', 'username', 'ime', 'prezime']
        });
        if (!user || !user.username || !user.id) return undefined;
        // everything checks out, return the refreshToken with username and id
        const userObj = {
            token: refreshToken(username),
            username: username,
            Fname: user.ime,
            Lname: user.prezime,
            id: user.id
        };
        return userObj;
    }
    catch (e){
        console.log(e);
        return undefined;
    }
};

const isProtectedRoute = (route, protectedRoutes) => !!protectedRoutes.find(r => r === route);

const checkAuth = () => (req,res,next) => {
    // if its a public path, just call next
    if (!isProtectedRoute(req.path, PROTECTED_ROUTES)) return next();
    // check for authorization header
    if (!req.get('Authorization')){
        res.status(401).send({
            status: 'Required login!'
        });
        return;
    }

    const authToken = req.get('Authorization');
    // let userObj = await validateAndRefreshToken(authToken)
    validateAndRefreshToken(authToken)
        .then(userObj => {
            if (!userObj || !userObj.token || !userObj.username || !userObj.id) throw new Error('invalid token');
            res.header("Authorization", userObj.token.toString());
            req.user = userObj;
            return next();
        })
        .catch(err =>{
            res.status(401).send({
                status: 'Required login! 2'
            });
        });
};


module.exports  = {
    checkAuth: checkAuth,
    hashPassword: hashPassword,
    refreshToken: refreshToken,
    validateAndRefreshToken: validateAndRefreshToken,
};