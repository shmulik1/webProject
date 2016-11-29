var http = require('http');
var fs = require('fs');
var formidable = require("formidable");
var util = require('util');
var url = require("url");
var express = require('express');
var bodyParser = require('body-parser')
var path = require('path');
var cookieParser = require('cookie-parser');
var mongo = require("mongoose");

console.log('Pending DB connection');
mongo.Promise = global.Promise;
var db = mongo.connect('mongodb://localhost:27017/myfirstdatabase', function(err) {
    if(!err) {
        console.log("Connected to DB")
    }
    else {
        console.log("Could not connect to database, error returned: " + err);
    }
});


var Schema = mongo.Schema;
var Branch = require('./DAL/branchSchema');
var Flower = require('./DAL/flowerSchema');
var User = require('./DAL/userSchema');
var Permission = User.permission;

var app = express();


// create the schema:
Branch.find({}, function (err, branches) {
    if (err) {
        console.log('ERROR in Branch.find' ,'error message: ' + err.message,'error name: ' + err.name);
        throw err.message;
    }
    if (branches.length == 0){
        AddBranch('S and Y Rishon-Leziyon', 1, 'Sigalit 1 Rishon Leziyon', 'dan', '08:00-19:00', '03-5701234');
        AddBranch('S and Y Jerusalem', 2, 'Nurit 2 Jerusalem', 'south', '08:00-19:00', '02-6418187');
        AddBranch('S and Y Tel-Aviv', 3, 'Narkis 3 TLV', 'dan', '08:00-19:00', '03-6771234');
        AddBranch('S and Y Naria', 4, 'Havazelet 4 Naarya', 'north', '08:00-19:00', '04-5781234');
        AddBranch('S and Y Petah-Tikva', 5, 'Yakinton 5 Petah Tikva', 'dan', '08:00-19:00', '03-6191234');
        AddBranch('S and Y Eilat', 6, 'Vered 6 Eilat', 'south', '08:00-19:00', '08-6128877');
        AddBranch('S and Y Ashdod', 7, 'Rakefet 7 Ashdod', 'dan', '08:00-19:00', '09-9326543');
    }
});

User.find({}, function (err, users) {
    if (err) {
        console.log('ERROR in User.find' ,'error message: ' + err.message,'error name: ' + err.name);
        throw err.message;
    }
    if (users.length == 0){
        AddUser("Shmulik Kreitenberger", 'sk', '1234', 3, new Date('1987-12-20'), 'google.com', 1);
        AddUser("Yakov Shechter", 'Yakov', '1234', 3, new Date('1989-02-02'), 'yahoo.com', 1);
        AddUser("Frida Kreitenberger", 'fk', '1234', 3, new Date('1990-01-02'), 'youtube.com', 1);

        AddUser("Avi Biton", 'avi', '1234', 2, new Date('1984-04-04'), 'microsoft.com', 2);
        AddUser("Daniel Friedman", 'daniel', '1234', 2, new Date('1985-05-05'), 'facebook.com', 2);
        AddUser("David Bergman", 'david', '1234', 3, new Date('1986-06-06'), 'twitter.com', 2);

        AddUser("Itay Maor", 'itay', '1234', 0, new Date('1987-07-07'), 'flickr.com', null);
        AddUser("Yehuda Dayan", 'yehuda', '1234', 0, new Date('1988-08-08'), 'alibaba.com', null);
        AddUser("Moishe Ufnik", 'moishe', '1234', 0, new Date('1989-09-09'), 'aliexpress.com', null);
        AddUser("ploni almoni", 'ploni', '1234', 0, new Date('1990-10-10'), 'ebay.com', null);
    }
});

Flower.find({}, function (err, flowers) {
    if (err) {
        console.log('ERROR in Flower.find' ,'error message: ' + err.message,'error name: ' + err.name);
        throw err.message;
    }
    if (flowers.length == 0){
        AddFlower('סחלב הביצות', "Anacamptis laxiflora (lax-flowered orchid, loose-flowered orchid, or green-winged meadow orchid) is a species of orchid. Wide distribution range in Europe and Asia as far north as in Gotland (Sweden). Tall plant, grows up to 60 cm high. Found in wet meadows with alcaline soil.[1] Common in Normandy and Brittany (France), in United Kingdom represented only on Channel Islands, where it is called Jersey Orchid. Notable habitat is Le Noir Pré meadow in Jersey, where each year in late May - early June can be observed mass bloom of these orchids.", 'purple', '/images/Orchis.jpg', '21.80');
        AddFlower('אירוס', "Iris is a genus of 260–300[1][2] species of flowering plants with showy flowers. It takes its name from the Greek word for a rainbow, which is also the name for the Greek goddess of the rainbow, Iris. Some authors state that the name refers to the wide variety of flower colors found among the many species.[3] As well as being the scientific name, iris is also very widely used as a common name for all Iris species, as well as some belonging to other closely related genera. A common name for some species is 'flags', while the plants of the subgenus Scorpiris are widely known as 'junos', particularly in horticulture. It is a popular garden flower. The often-segregated, monotypic genera Belamcanda (blackberry lily, I. domestica), Hermodactylus (snake's head iris, I. tuberosa), and Pardanthopsis (vesper iris, I. dichotoma) are currently included in Iris. Three Iris varieties are used in the Iris flower data set outlined by Ronald Fisher in his 1936 paper The use of multiple measurements in taxonomic problems as an example of linear discriminant analysis.", 'blue', '/images/Iris.jpg', '13.90');
        AddFlower('כלנית מצויה', "Anemone coronaria (poppy anemone,[1] Spanish marigold, dağ lalesi in Turkish, kalanit in Hebrew, shaqa'iq An-Nu'man in Arabic) is a species of flowering plant in the genus Anemone, native to the Mediterranean region.", 'red', '/images/Anemone.jpg', '89.90');
        AddFlower('חמנית מצויה', "Helianthus annuus, the common sunflower, is a large annual forb of the genus Helianthus grown as a crop for its edible oil and edible fruits (sunflower seeds). This sunflower species is also used as bird food, as livestock forage (as a meal or a silage plant), and in some industrial applications. The plant was first domesticated in the Americas. Wild Helianthus annuus is a widely branched annual plant with many flower heads. The domestic sunflower, however, often possesses only a single large inflorescence (flower head) atop an unbranched stem. The name sunflower may derive from the flower's head's shape, which resembles the sun, or from the false impression that the blooming plant appears to slowly turn its flower towards the sun as the latter moves across the sky on a daily basis.", 'yellow', '/images/sunflower.jpg', '1.70');
        AddFlower('מרווה', "Salvia is the largest genus of plants in the mint family, Lamiaceae, with nearly 1000 species of shrubs, herbaceous perennials, and annuals.[3][4][5] Within the Lamiaceae, Salvia is part of the tribe Mentheae within the subfamily Nepetoideae.[3] It is one of several genera commonly referred to as sage.", 'purple', '/images/Salvia.jpg', '14.40');
        AddFlower('דליה', "Dahlia flower is a national flower of Mexico and is named after 18th century botanist Anders Dahl. It belongs to an asteraceae genus with over 30 species in its family.  Dahlia has a vast range of hues from bronze to red and white to purple and is grown throughout the year.", 'pink', '/images/dahlia.jpg', '14.40');
    }
});


app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname + '/public')));
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
app.use(cookieParser());
app.use(loadUser);

app.get('/', function(req, res) {
    var pathname = url.parse(req.url).pathname;
    console.log("Request for " + pathname + " received.");
    //console.log("req.user " + req.user );//////////////////////////////
    res.render('pages/main',{user: req.user});
});



app.get('/branches', function(req, res) {
    var pathname = url.parse(req.url).pathname;
    console.log("Request for " + pathname + " received.");

    Branch.find({isActive: true}, function(err, branchlist) {
        if (err) {
            console.log('ERROR in branches/find' ,'error message: ' + err.message,'error name: ' + err.name);
            throw err.message;
        }
        // object of all the branches
        res.json(branchlist);
    });
});



app.get('/branchesManagement', function (req, res) {
    var pathname = url.parse(req.url).pathname;
    console.log("Request for " + pathname + " received.");

    if (!req.user.authenticated || req.user.permission < 3) {
        res.send('Please login as admin first', 401);
        return;
    }
    Branch.find({isActive: true}, function(err, branches) {
        if (err) throw err;
        // object of all the branches
        res.json(branches);
    });
});


app.get('/flowerslist', function(req, res) {
    var pathname = url.parse(req.url).pathname;
    console.log("Request for " + pathname + " received.");

    Flower.find({isActive: true}, function(err, flowerslist) {
        if (err) {
            console.log('ERROR in flowerslist/find' ,'error message: ' + err.message,'error name: ' + err.name);
            throw err.message;
        }
        // object of all the flowers
        res.json(flowerslist);
    });
});



app.get('/userslist', function(req, res) {
    var pathname = url.parse(req.url).pathname;
    console.log("Request for " + pathname + " received.");

    User.find({isActive: true}, function(err, users) {
        if (err) {
            console.log('ERROR in userslist/find' ,'error message: ' + err.message,'error name: ' + err.name);
            throw err.message;
        }
        // object of all the branches
        res.json(users);
    });
});


app.get('/load_user_management_by_permission', function (req, res) {
    var pathname = url.parse(req.url).pathname;
    console.log("Request for " + pathname + " received.");

    if (req.user.permission < 2) {
        res.send('No permission for users management', 404);
    }
    else if (req.user.permission == 2) {
        res.sendFile('public/pages/user_Management_worker.html', { root: __dirname });
    }
    else {
        res.sendFile('public/pages/user_Management_manager.html', { root: __dirname });
    }
});


app.get('/Login', function(req, res) {
    var pathname = url.parse(req.url).pathname;
    console.log("Request for " + pathname + " received.");

    User.find({username:req.query.username, password:req.query.password, isActive: true}, function (err, user) {
        if (err) {
            console.log('ERROR in Login/find' ,'error message: ' + err.message,'error name: ' + err.name);
            throw err.message;
        }
        if (user.length == 1){
            res.cookie('userID', user[0]._id);
            res.redirect("/");
        }
    });
});



var server = app.listen(5557, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("app listening on http://%s:%s", host, port)
})


app.get('/addUser', function (req, res) {
    var pathname = url.parse(req.url).pathname;
    console.log("Request for " + pathname + " received.");

    if (req.user.permission < 2 || (req.user.permission < 3 && req.query.permission > 0)) {
        res.send('No permission for that type of user', 404);
        return;
    }

    var user = new User({
        name: req.query.name,
        username: req.query.username,
        password: req.query.password,
        permission: req.query.permission,
        isActive: true,
        meta: {birthday: req.query.birthday,
            website: req.query.website},
        branch_number: req.query.branch_number
    });
    user.save(function (err) {
        if (err) {
            console.log('ERROR in addUser/save' ,'error message: ' + err.message,'error name: ' + err.name);
            throw err.message;
        }
        User.find({isActive: true}, function (err, users) {
            if (err) {
                console.log('ERROR in addUser/save/find' ,'error message: ' + err.message,'error name: ' + err.name);
                throw err.message;
            }
            // object of all the branches
            res.json(users);
        });
    });
});

app.get('/editUser', function (req, res) {
    var pathname = url.parse(req.url).pathname;
    console.log("Request for " + pathname + " received.");

    if (req.user.permission < 2 || (req.user.permission < 3 && req.query.permission > 0)) {
        res.send('No permission for that type of user', 404);
        return;
    }

    var userID = req.query.user_id;
    User.findById(userID, function (err, user) {
        if (err) {
            console.log('ERROR in editUser/findById' ,'error message: ' + err.message,'error name: ' + err.name);
            throw err.message;
        }

        user.name = req.query.name;
        user.username = req.query.username;
        user.password = req.query.password;
        user.permission = req.query.permission;
        user.meta.birthday = req.query.birthday;
        user.meta.website = req.query.website;
        user.branch_number = req.query.branch_number;

        user.save(function (err) {
            if (err) {
                console.log('ERROR in editUser/save' ,'error message: ' + err.message,'error name: ' + err.name);
                throw err.message;
            }
            User.find({isActive: true}, function (err, users) {
                if (err) {
                    console.log('ERROR in editUser/save/find' ,'error message: ' + err.message,'error name: ' + err.name);
                    throw err.message;
                }
                // object of all the branches
                res.json(users);
            });
        });
    });
});

app.get('/deleteUser', function (req, res) {
    var pathname = url.parse(req.url).pathname;
    console.log("Request for " + pathname + " received.");

    console.log("req.user.permission " + req.user.permission);
    console.log("req.query.permission " + req.query.permission);
    if (req.user.permission < 2 || (req.user.permission < 3 && req.query.permission > 0)) {
        res.send('No permission for that type of user', 404);
        return;
    }

    var userID = req.query.user_id;
    User.findById(userID, function (err, user) {
        if (err) {
            console.log('ERROR in deleteUser/findById' ,'error message: ' + err.message,'error name: ' + err.name);
            throw err.message;
        }
        user.isActive = false;
        user.save(function (err) {
            if (err) {
                console.log('ERROR in deleteUser/findById/save' ,'error message: ' + err.message,'error name: ' + err.name);
                throw err.message;
            }
            User.find({isActive: true}, function (err, users) {
                if (err) {
                    console.log('ERROR in deleteUser/findById/save/find' ,'error message: ' + err.message,'error name: ' + err.name);
                    throw err.message;
                }
                // object of all the branches
                res.json(users);
            });
        });
    });
});


app.get('/deleteBranch', function (req, res) {
    var pathname = url.parse(req.url).pathname;
    console.log("Request for " + pathname + " received.");

    if (!req.user.authenticated || req.user.permission < 3) {
        res.send('Please login as admin first', 401);
        return;
    }
    var branchID = req.query.branch_id;
    Branch.findById(branchID, function (err, brunch) {
        if (err) {
            console.log('ERROR in deleteBranch/findById' ,'error message: ' + err.message,'error name: ' + err.name);
            throw err.message;
        }
        brunch.isActive = false;
        brunch.save(function (err) {
            if (err) {
                console.log('ERROR in deleteBranch/findById/save' ,'error message: ' + err.message,'error name: ' + err.name);
                throw err.message;
            }
            Branch.find({isActive: true}, function (err, branches) {
                if (err) {
                    console.log('ERROR in deleteBranch/findById/save/find' ,'error message: ' + err.message,'error name: ' + err.name);
                    throw err.message;
                }
                // object of all the branches
                res.json(branches);
            });
        });
    });
});


app.get('/editBranch', function (req, res) {
    var pathname = url.parse(req.url).pathname;
    console.log("Request for " + pathname + " received.");

    if (!req.user.authenticated || req.user.permission < 3) {
        res.send('Please login as admin first', 401);
        return;
    }
    var branchID = req.query.branch_id;
    var branchName = req.query.name;
    var branchAddress = req.query.address;
    var hours = req.query.hours;
    var state = req.query.state;
    console.log("req.query.name " + req.query.name );
    console.log("branchName " + branchName );

    Branch.findById(branchID, function (err, brunch) {
        if (err) {
            console.log('ERROR in editBranch/findById' ,'error message: ' + err.message,'error name: ' + err.name);
            throw err.message;
        }
        console.log("brunch.name " + brunch.name );
        brunch.name = branchName;
        console.log("brunch.name = branchName");
        console.log("brunch.name " + brunch.name );
        brunch.address = branchAddress;
        brunch.openingHours = hours;
        brunch.state = state;
        brunch.save(function (err) {
            if (err) {
                console.log('ERROR in editBranch/findById/save' ,'error message: ' + err.message,'error name: ' + err.name);
                throw err.message;
            }
            Branch.find({isActive: true}, function (err, branches) {
                if (err) {
                    console.log('ERROR in editBranch/findById/save/find' ,'error message: ' + err.message,'error name: ' + err.name);
                    throw err.message;
                }
                // object of all the branches
                res.json(branches);
            });
        });
    });
});


app.get('/addBranch', function (req, res) {
    var pathname = url.parse(req.url).pathname;
    console.log("Request for " + pathname + " received.");

    if (!req.user.authenticated || req.user.permission < 3) {
        res.send('Please login as admin first', 401);
        return;
    }
    //var branchName = req.query.name;
    //var branchAddress = req.query.address;
    //var hours = req.query.h;
    //var num = req.query.num;
    //var state = req.query.state;
    console.log('/addBranch req.query.name ' + req.query.name + ' req.query.number ' + req.query.number + ' req.query.state ' + req.query.state + ' req.query.address ' + req.query.address + ' req.query.hours ' + req.query.hours);
    var branch = new Branch({
        name: req.query.name,
        number: req.query.number,
        state: req.query.state,
        address: req.query.address,
        isActive: true,
        openingHours: req.query.hours
    });
    branch.save(function (err) {
        if (err) {
            console.log('ERROR in addBranch/save' ,'error message: ' + err.message,'error name: ' + err.name);
            throw err.message;
        }
        Branch.find({isActive: true}, function (err, branches) {
            if (err) {
                console.log('ERROR in deleteBranch/save/find' ,'error message: ' + err.message,'error name: ' + err.name);
                throw err.message;
            }
            // object of all the branches
            res.json(branches);
        });
    });
});



function loadUser(req, res, next) {
    console.log("Request for loadUser received.");

    var userID = req.cookies['userID'];
    if (userID) {
        User.findById(userID, function (err, user) {
            if (err) {
                console.log('ERROR in loadUser/findById' ,'error message: ' + err.message,'error name: ' + err.name);
                throw err.message;
            }
            if (user) {
                req.user = user;
                req.user.authenticated = true;
            }
            else {
                setEmptyUser(req);
            }
            next();
        });
    }
    else {
        setEmptyUser(req);
        next();
    }
}

function setEmptyUser(req) {
    console.log("Request for setEmptyUser received.");

    req.user = new User();
    req.user.authenticated = false;
    req.user.name = 'Guest';
    req.user.permission = 0;
}



function AddBranch(pname, pnumber, paddress, pstate, popeningHours, pphoneNumber) {
    console.log("Request for AddBranch received.");

    var branch = new Branch({
        name: pname,
        number: pnumber,
        address: paddress,
        state: pstate,
        isActive: true,
        openingHours: popeningHours,
        phoneNumber: pphoneNumber
    });
    branch.save(function (err) {
        if (err) {
            console.log('ERROR in AddBranch/save' ,'error message: ' + err.message,'error name: ' + err.name);
            throw err.message;
        }
        console.log('branch saved');
    });
}

function UpdateBranch(branch_new) {
    console.log("Request for UpdateBranch received.");

    Branch.findById(branch_new._id, function (err, branch) {
        if (err) {
            console.log('ERROR in UpdateBranch' ,'error message: ' + err.message,'error name: ' + err.name);
            throw err.message;
        }
        branch.name = branch_new.name;
        branch.address = branch_new.address;
        branch.state = branch_new.state;
        branch.isActive = branch_new.isActive;
        branch.openingHours = branch_new.openingHours;
        branch.number = branch_new.number;
        branch.phoneNumber = branch_new.phoneNumber;
        branch.save(function (err) {
            if (err) {
                console.log('ERROR in UpdateBranch/save' ,'error message: ' + err.message,'error name: ' + err.name);
                throw err.message;
            }
            console.log('branch updated');
        });
    });
}

function DeleteBranch(branch) {
    console.log("Request for DeleteBranch received.");

    branch.isActive = false;
    UpdateBranch(branch);
}

function AddUser(pname, pusername, ppassword, ppermission, pbirthday, pwebsite, pbranch_number) {
    console.log("Request for AddUser received.");

    var user = new User({
        name: pname,
        username: pusername,
        password: ppassword,
        permission: ppermission,
        isActive: true,
        meta: {birthday: pbirthday,
            website: pwebsite},
        branch_number: pbranch_number
    });
    user.save(function (err) {
        if (err) {
            console.log('ERROR in AddUser/save' ,'error message: ' + err.message,'error name: ' + err.name);
            throw err.message;
        }
        console.log('user saved');
    });
}

function AddFlower(name, description, color, image_link, price) {
    console.log("Request for AddFlower received.");

    var flower = new Flower({
        name: name,
        description: description,
        color: color,
        image_link: image_link,
        price: price,
        isActive: true
    });
    flower.save(function (err) {
        if (err) {
            console.log('ERROR in AddFlower/save' ,'error message: ' + err.message,'error name: ' + err.name);
            throw err.message;
        }
        console.log('flower saved');
    });
}

function UpdateFlower(flower_new) {
    console.log("Request for UpdateFlower received.");

    Flower.findById(flower_new._id, function (err, flower) {
        if (err) {
            console.log('ERROR in UpdateFlower' ,'error message: ' + err.message,'error name: ' + err.name);
            throw err.message;
        }
        flower.isActive = flower_new.isActive;
        flower.name = flower_new.name;
        flower.description = flower_new.description;
        flower.color = flower_new.color;
        flower.image_link = flower_new.image_link;
        flower.price = flower_new.price;
        flower.save(function (err) {
            if (err) {
                console.log('ERROR in UpdateFlower/save' ,'error message: ' + err.message,'error name: ' + err.name);
                throw err.message;
            }
            console.log('flower updated');
        });
    });
}