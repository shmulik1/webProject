var http = require('http');
var fs = require('fs');
var formidable = require("formidable");
var util = require('util');
var url = require("url");
var express = require('express');
var bodyParser = require('body-parser')
var path = require('path');

var app = express();
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname + '/public')));
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

app.get('/', function(req, res) {
    var pathname = url.parse(req.url).pathname;
    console.log("Request for " + pathname + " received.");
    res.render('pages/main');
});

//app.get('/ejs', function(req, res) {
//    var pathname = url.parse(req.url).pathname;
//    console.log("Request for " + pathname + " received.");
//    res.render('pages/index');
//});

app.get('/branches', function(req, res) {
    var pathname = url.parse(req.url).pathname;
    console.log("Request for " + pathname + " received.");
    res.send(JSON.stringify(branchlist));
});

app.get('/flowerslist', function(req, res) {
    var pathname = url.parse(req.url).pathname;
    console.log("Request for " + pathname + " received.");
    res.send(JSON.stringify(flowerslist));
});

app.get('/userslist', function(req, res) {
    var pathname = url.parse(req.url).pathname;
    console.log("Request for " + pathname + " received.");
    res.send(JSON.stringify(userslist));
});

app.post('/Login', function(req, res) {
    var pathname = url.parse(req.url).pathname;
    console.log("Request for " + pathname + " received.");

    // console.log("req.body " + req.body + " !!!!!.");
    // console.log("req.body.user " + req.body.user);
    // console.log("req.body.password " +req.body.password);
    var sent = false;

    for(var i = 0; i < userslist.length; i++){
        if((userslist[i].user === req.body.user) && (userslist[i].password === req.body.password)){
            res.send(JSON.stringify(userslist[i]));
            sent = true;
            break;
        }
    }
    if (!sent){
        res.send('user or password is incorrect');
    }

});

var server = app.listen(5557, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("app listening on http://%s:%s", host, port)

})





var branchlist=[];

branchlist.push({
    name:'S&Y Haifa',
    id:'01', address:'Horev 1',
    phone:'04-1234567',
    state:'north' ,
    valid:'yes'
});
branchlist.push({
    name:'S&Y Naria',
    id:'04', address:'Streat 1',
    phone:'08-1234567',
    state:'north' ,
    valid:'yes'
});
branchlist.push({
    name:'S&Y Tel-Aviv',
    id:'02',
    address:'Yarqon 1',
    phone:'03-1234567',
    state:'dan',
    valid:'yes'
});
branchlist.push({
    name:'S&Y Bnei-Brak',
    id:'05',
    address:'Miron 1',
    phone:'03-7654321',
    state:'dan',
    valid:'yes'
});
branchlist.push({
    name:'S&Y Jerusalem',
    id:'03',
    address:'Ben-Yehuda 1',
    phone:'02-1234567',
    state:'south',
    valid:'yes'
});



var flowerslist = [];

flowerslist.push({
    title:'סחלב הביצות',
    img:'/images/Orchis_laxiflora.jpg',
    desc:"Anacamptis laxiflora (lax-flowered orchid, loose-flowered orchid, or green-winged meadow orchid) is a species of orchid. Wide distribution range in Europe and Asia as far north as in Gotland (Sweden). Tall plant, grows up to 60 cm high. Found in wet meadows with alcaline soil.[1] Common in Normandy and Brittany (France), in United Kingdom represented only on Channel Islands, where it is called Jersey Orchid. Notable habitat is Le Noir Pré meadow in Jersey, where each year in late May - early June can be observed mass bloom of these orchids.",
    color:'purple',
    price:'42$',
    id:'1'
});
flowerslist.push({
    title:'אירוס',
    img:'/images/Iris_Latifolia_R03.jpg',
    desc:"Iris is a genus of 260–300[1][2] species of flowering plants with showy flowers. It takes its name from the Greek word for a rainbow, which is also the name for the Greek goddess of the rainbow, Iris. Some authors state that the name refers to the wide variety of flower colors found among the many species.[3] As well as being the scientific name, iris is also very widely used as a common name for all Iris species, as well as some belonging to other closely related genera. A common name for some species is 'flags', while the plants of the subgenus Scorpiris are widely known as 'junos', particularly in horticulture. It is a popular garden flower. The often-segregated, monotypic genera Belamcanda (blackberry lily, I. domestica), Hermodactylus (snake's head iris, I. tuberosa), and Pardanthopsis (vesper iris, I. dichotoma) are currently included in Iris. Three Iris varieties are used in the Iris flower data set outlined by Ronald Fisher in his 1936 paper The use of multiple measurements in taxonomic problems as an example of linear discriminant analysis.",
    color:'blue',
    price:'35$',
    id:'2'
});
flowerslist.push({
    title:'כלנית מצויה',
    img:'/images/Colorful-Anemone-coronaria-Zachi-Evenor.jpg',
    desc:"Anemone coronaria (poppy anemone,[1] Spanish marigold, dağ lalesi in Turkish, kalanit in Hebrew, shaqa'iq An-Nu'man in Arabic) is a species of flowering plant in the genus Anemone, native to the Mediterranean region.",
    color:'red',
    price:'20$',
    id:'3'
});
flowerslist.push({
    title:'חמנית מצויה',
    img:'/images/A_sunflower.jpg',
    desc:"Helianthus annuus, the common sunflower, is a large annual forb of the genus Helianthus grown as a crop for its edible oil and edible fruits (sunflower seeds). This sunflower species is also used as bird food, as livestock forage (as a meal or a silage plant), and in some industrial applications. The plant was first domesticated in the Americas. Wild Helianthus annuus is a widely branched annual plant with many flower heads. The domestic sunflower, however, often possesses only a single large inflorescence (flower head) atop an unbranched stem. The name sunflower may derive from the flower's head's shape, which resembles the sun, or from the false impression that the blooming plant appears to slowly turn its flower towards the sun as the latter moves across the sky on a daily basis.",
    color:'yellow',
    price:'10$',
    id:'4'
});
flowerslist.push({
    title:'מרווה',
    img:'/images/Salvia_×_coahuilensis.jpg',
    desc:"Salvia is the largest genus of plants in the mint family, Lamiaceae, with nearly 1000 species of shrubs, herbaceous perennials, and annuals.[3][4][5] Within the Lamiaceae, Salvia is part of the tribe Mentheae within the subfamily Nepetoideae.[3] It is one of several genera commonly referred to as sage.",
    color:'purple',
    price:'29$',
    id:'5'
});
flowerslist.push({
    title:'דליה',
    img:'/images/dahlia-flowers.jpg',
    desc:"Dahlia flower is a national flower of Mexico and is named after 18th century botanist Anders Dahl. It belongs to an asteraceae genus with over 30 species in its family.  Dahlia has a vast range of hues from bronze to red and white to purple and is grown throughout the year.",
    color:'pink',
    price:'25$',
    id:'6'
});




var userslist = [];

userslist.push({
    firstName:'David ',
    lastName:'Levy',
    id:'30303030',
    user:'david',
    password:'1234',
    accountType:'employee',
    branchesNum:'01'
});
userslist.push( {
    firstName:'Shmulik ',
    lastName:'K',
    id:'301301301',
    user:'SK',
    password:'1234',
    accountType:'manager',
    branchesNum:'NULL'
});
userslist.push({
    firstName:'David ',
    lastName:'Levy',
    id:'30303030',
    user:'david',
    password:'1234',
    accountType:'supplier',
    branchesNum:'01'
});
userslist.push({
    firstName:'Itzick ',
    lastName:'berko',
    id:'30303030',
    user:'itzick',
    password:'1234',
    accountType:'customer',
    branchesNum:'02'
});
userslist.push( {
    firstName:'Dan ',
    lastName:'Lin',
    id:'30303030',
    user:'dan',
    password:'1234',
    accountType:'manager',
    branchesNum:'NULL'
});