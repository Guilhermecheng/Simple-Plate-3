const express = require('express')
const app = express()

const fs = require('fs');

const port = 3000
var path = require('path');
// const isDev = app.get('env') === 'development';

const bodyParser = require('body-parser')

let nunjucks = require('nunjucks')

app.use(bodyParser.urlencoded({extended: false}))

app.set('view engine','html');

// configuring nunjucks
nunjucks.configure(['views/'], {
    autoescape: false,
    express:app
});

// using the public directory
app.use(express.static(path.join(__dirname,'public')))

// get form info to register in the json menu
app.post('/plate_create', (req, res) => {

    var plate_name = req.body.plateName;
    var plate_time = req.body.plateTime;
    var plate_serves = "serves " + req.body.plateServes;
    var plate_address = req.body.plateAddress;
    var plate_image = req.body.plateImage;
    var string =  req.body.plateIngredients;    
    var plate_ingredients = string.split(",");
    var plate_instructions = req.body.plateInstructions;

    fs.readFile('./plates.json', (err, json) => {
        if (err) {
            console.log(err);
        } else {
            var obj = JSON.parse(json);

            obj.push({
                name: plate_name,
                time: plate_time,
                serves: plate_serves,
                address: plate_address,
                stars: "4",
                image:plate_image,
                ingredients: plate_ingredients,
                instructions: plate_instructions
            });
            var objson = JSON.stringify(obj)

            fs.writeFile('plates.json', objson, function(err){
                if (err) {
                    throw err;
                } else {
                    console.log('complete');
                }
            })
        }
    });
    res.redirect('/');
});

// sending menu to main page
app.get('/plates_data', (req, res) => {
    fs.readFile('./plates.json', (err, json) => {
        let obj = JSON.parse(json);
        res.json(obj);
    });
});

// main page
app.get('/', (req, res) => {
    res.render('indexx');
});

// new plate page
app.get('/newplate', (req, res) => {
    res.render('newplate');
});

// about page
app.get('/about', (req, res) => {
    res.render('about');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});