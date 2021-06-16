var express = require('express'),
router = express.Router();

var app = express();
var bodyParser = require('body-parser');
var mysql = require("mysql")
var jwt    = require('jsonwebtoken');

var local = require('./config/local');
var pool = mysql.createPool(local.options);


var todocontroller = require('./controllers/TodoController')


var config = require('./config/jwtconfig');

//set secret
app.set('Secret', config.secret);


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = 3000;


router.use((req, res, next) =>{
    // check header for the token
    var token = req.headers['access-token'];

    // decode token
    if (token) {
      // verifies secret and checks if the token is expired
        jwt.verify(token, app.get('Secret'), (err, decoded) =>{
            if (err) {
                return res.sendStatus(401); //res.json({ message: '401' });    
            } else {
              // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                var $sql = "SELECT * FROM tbl_user WHERE user_id = "+decoded.userid+" AND session_id = '"+token+"'";
                pool.query($sql,function(err,results){
                    if(results && results.length >0){
                        next();
                    }else{
                        res.sendStatus(401);
                    }
                });
            }
        });
    } else {
      // if there is no token  
      res.sendStatus(401);
    }
});



app.post("/login",function(req,res){
  
    pool.query("SELECT * FROM tbl_user WHERE user_name = ? AND pass_word= ?",[req.body.username,req.body.password] function(err, results){
  
        if(results && results.length > 0){

                var  payload = {
                    check:  true,
                    userid: results[0].user_id
                };

                var token = jwt.sign(payload, app.get('Secret'), {
                    expiresIn: "24h" // expires in 24 hours
                });

                pool.query("UPDATE tbl_user SET session_id= ? WHERE user_id= ?",[token,results[0].user_id],function(err,results){
                    res.send({status:200, data: token})
                })
        }else{
            res.send({status:500, data:"username or password wrong"})
        }        
    })    
})

router.use('/todo', todocontroller);

app.use('/', router);

app.listen(port,function(){
    console.log("API listening port is "+port)
})