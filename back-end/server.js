let express = require("express");
let app = express();
var request = require("request");
var cors = require("cors");
let bodyParser = require("body-parser");
let jwt = require('jsonwebtoken');

app.listen(3000,() => 
{
    console.log("Server Started on port 3000");
});

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/dateFact',(req,res) =>
{
    var month = req.query.month;
    var day = req.query.day;

    var options = {
        method: 'GET',
        url: 'https://numbersapi.p.rapidapi.com/'+month+'/'+day+'/date',
        qs: {fragment: 'true', json: 'true'},
        headers: {
          'x-rapidapi-host': 'numbersapi.p.rapidapi.com',
          'x-rapidapi-key': '1d50460623msh1a322c10d21d99ep19902ejsnb90ec7bc9e62'
        }
      };

    request(options, function (error, response, body) {
        if(error)
        {
            res.status(401).send({ message: "Could not retrieve fact",error: error })
        }
        else
        {
            body = JSON.parse(body);
            if(typeof(body)==='undefined')
            {
                res.status(401).send({ message: "Fact not found",error: error })
            }
            else
            {
                res.status(200).send(body);
            } 
        }
    });
});

app.get('/yearFact',(req,res) =>
{
    var year = req.query.year;

    var options = {
        method: 'GET',
        url: 'https://numbersapi.p.rapidapi.com/'+year+'/year',
        qs: {fragment: 'true', json: 'true'},
        headers: {
          'x-rapidapi-host': 'numbersapi.p.rapidapi.com',
          'x-rapidapi-key': '1d50460623msh1a322c10d21d99ep19902ejsnb90ec7bc9e62'
        }
      };

    request(options, function (error, response, body) {
        if(error)
        {
            res.status(401).send({ message: "Could not retrieve fact",error: error })
        }
        else
        {
            body = JSON.parse(body);
            if(typeof(body)==='undefined')
            {
                res.status(401).send({ message: "Fact not found",error: error })
            }
            else
            {
                res.status(200).send(body);
            } 
        }
    });
});

app.get('/generateToken',(req,res) =>
{
    var email = req.query.email;
    var name = req.query.name;
    var password = req.query.password;
    var x = {
        email: email,
        name: name,
        password: password
    }
    jwt.sign(x,'someSecretKey',(err,token) =>
    {
        if(err)
        {
            res.status(401).send({ message: 'Error while generating JSON Web Token' });
        }
        else
        {
            res.status(200).send({ message: 'Token Generated', token: token })
        }
    });
});

app.get('/verifyToken',(req,res) =>
{
    var token = req.query.token;
    jwt.verify(token,'someSecretKey',(err,data) =>
    {
        if(err)
        {
            res.status(401).send({ message: 'Error while verifying JSON Web Token' });
        }
        else
        {
            res.status(200).send({ message: 'Token verified', email: data.email, name: data.name, password: data.password });
        }
    });
});