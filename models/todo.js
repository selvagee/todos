var pool=require("../config/db").pool;

exports.findAll = function (cb) {
    
    pool.query("SELECT * FROM todos ORDER BY createdAt DESC", function (err, result) {
        if (err) return cb(err, null);
        
        
        cb(null,result);
    })
}

exports.findOne = function (id,cb) {
    
    pool.query("SELECT * FROM todos WHERE id= ?", id, function (err, result) {
        if (err) return cb(err,null);
        
        cb(null,result);
    })
}

exports.create = function (inputobj,cb){

    pool.query("INSERT INTO todos SET ?", [inputobj], function (err, result) {
        if (err) return cb(err,null);
        
        cb(null,result);
    })
}

exports.update = function (inputobj, id, cb){

    pool.query("UPDATE todos SET ? WHERE id = ?", [inputobj, id], function (err, result){
        if (err) return cb(err,null); 
        
        cb(null,result);
    })
}

exports.delete = function (id,cb) {

    pool.query("DELETE FROM todos WHERE id = ?", id, function (err, result) {
        if (err) return cb(err,null);
        
        cb(null,resultset);
    })
}