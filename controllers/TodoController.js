var express = require('express');
var router = express.Router();
var todo = require('../models/todo');


router.get('/', function(req,res){
	todo.findAll(function(err,result){
		if(err){
			res.send({status:500,data:"There was problem finding the todos"})
		}else{
			res.send({status:200,data:result})	
		}
	});
})  


router.post('/add',function(req,res){
	todo.create(req.body,function(err, result){
		if(err){
			res.send({status:500,data:"problem insert the record"})
		}else{
			res.send({status:200,data:"successfully inserted"})	
		}
	})
})


router.post('/update',function(req,res){
	inputobj = {
		todo: req.body.todo
	}
	todo.update(inputobj,req.body.id, function(err, result){
		if(err){
			res.send({status:500,data:"problem update the record"})
		}else{
			res.send({status:200,data:"successfully updated"})	
		}
	})
})


//finding the specific record
router.get('/edit/:id',function(req,res){
	todo.findOne(req.params.id,function(err,result){
		if(err){
			res.send({status:500,data:"There was problem finding the todo"})
		}else{
			res.send({status:200,data:result})	
		}	
	});
})



//Delete record
router.get('/delete/:id',function(req,res){
	todo.delete(req.params.id,function(err, result){
		if(err){
			res.send({status:500,data:"problem delete the record"})
		}else{
			res.send({status:200,data:"successfully inserted"})	
		}
	})
})

module.exports = router;





