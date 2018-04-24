var express = require('express');
var router = express.Router();
var auth = require('../util/auth');
var models  = require('../models');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', function(req, res, next){
    const { username, email, password, Fname, Lname } = req.body;
    if (!username || !email || !password) {
        res.status(400).send({ err: 'Bad register'});
        return;
    }
    const encryptedPassword = auth.hashPassword(password);
    models.User.create({ username, password: encryptedPassword,  email, ime: Fname, prezime: Lname })
        .then((user) => {
            res.send({ status: 'OK'});
        })
        .catch(err => res.status(400).send({ err: 'Bad register.'}));
});

router.post('/login', function (req, res, next) {
    let { username, password } = req.body;
    if (!username || !password) {
        res.status(400);
        res.send({
            err: 'Bad login'
        });
        return;
    }

    password = auth.hashPassword(password);

    models.User.findOne({
        where: { username, password },
        attributes: [ 'id', 'username', 'ime', 'prezime']
    }).then(user => {
        if (!user) throw new Error('bad login');
        return {
            token: auth.refreshToken(username),
            username: username,
            Fname: user.ime,
            Lname: user.prezime,
            id: user.id
        };
    }).then(userObj => {
        if (!userObj || !userObj.token || !userObj.username || !userObj.id){
            res.status(400).send({ err: 'Bad login'});
        } else {
            console.log(userObj);
            res.header("Authorization", userObj.token.toString());
            res.send({username: userObj.username, Fname: userObj.Fname, Lname: userObj.Lname, id: userObj.id, token: userObj.token.toString()});
        }
    }).catch(err => {
        res.status(400).send({ err: 'Bad login'})
    });
});

module.exports = router;
