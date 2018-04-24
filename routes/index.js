var express = require('express');
var router = express.Router();
const auth = require('../util/auth');
const models = require('../models');
var queries = require('../queries/queries');
var url = require('url');
var request = require('request');
var cheerio = require('cheerio');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/get-current-user', function(req, res, next) {
    const user = req.user;

    const current_user = {
        username: user.username,
        Fname: user.Fname,
        Lname: user.Lname,
        id: user.id
    };

    res.send(current_user);

});

router.post('/add-link', function(req, res, next) {
    let { link } = req.body;
    const user = req.user;

    let http = link.search("http://");
    if (http === -1) {
        link = "http://" + link;
    }

    let q = url.parse(link, true);

    let host = q.host;
    let pathname = q.pathname;
    let search = q.query;

   let linksOBJ = [];

    queries.getAllLinks()
        .then(links => {
            let newLinks = links.map(el => el.name);
            for(let i=0; i<newLinks.length; i++){
                let q = url.parse(newLinks[i], true);
                linksOBJ.push({
                    name: newLinks[i],
                    host: q.host,
                    pathname: q.pathname,
                    search: q.query,
                });
            }

            let matchLink = linksOBJ.find( el => el.host === host && el.pathname === pathname);
            console.log('ml', matchLink);

            if (matchLink) {
                if(isEquivalent(matchLink.search, search)){
                    console.log('link je isti');
                    let getLinkID = links.find(el => el.name === matchLink.name);
                    console.log('id', getLinkID.id);
                    queries.insertUserLink(user.id, getLinkID.id)
                        .then(link => {
                            res.send('ok');
                        }).catch(err => {
                        res.status(400).send('err');
                    });
                } else {
                    console.log('unesi link 2');
                    queries.insertLink(link)
                        .then(link => {
                            queries.insertUserLink(user.id, link)
                                .then(link => {
                                    res.send('ok');
                                }).catch(err => {
                                res.status(400).send('err');
                            });
                        }).catch(err => {
                        res.status(400).send('err');
                    });
                }
            } else {
                console.log('unesi link 1');
                queries.insertLink(link)
                    .then(link => {
                        console.log('llll', link);
                        queries.insertUserLink(user.id, link[0].id)
                            .then(link => {
                                res.send('ok');
                            }).catch(err => {
                            res.status(400).send('err');
                        });
                    }).catch(err => {
                        res.status(400).send('err');
                });
            }

        }).catch(err => {
        console.log(err);
        res.status(400).send('err');
    });
});

router.get('/get-all-links', function(req, res, next) {
    const user = req.user;
    queries.getAllUserLinks(user.id)
        .then(link => {
            res.send(link);
        }).catch(err => {
        res.status(400).send('err');
    });
});

router.post('/text-analysis', function(req, res, next) {
    let {link} = req.body;
    console.log(link);

    request(link, function (error, response, body) {
        if (!error){
            const $ = cheerio.load(body);
            console.log(body);
            res.send(body);
        }
    });
});

module.exports = router;

function isEquivalent(a, b) {
    // Create arrays of property names
    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);

    // If number of properties is different,
    // objects are not equivalent
    if (aProps.length != bProps.length) {
        return false;
    }

    for (var i = 0; i < aProps.length; i++) {
        var propName = aProps[i];

        // If values of same property are not equal,
        // objects are not equivalent
        if (a[propName] !== b[propName]) {
            return false;
        }
    }

    // If we made it this far, objects
    // are considered equivalent
    return true;
}
