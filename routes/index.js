var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var mongoose = require('mongoose');


mongoose.connect('mongodb://test:2513433@ds145303.mlab.com:45303/todoli');

var todoSchema = new mongoose.Schema({

 item: String

});

var Todo = mongoose.model('Todo', todoSchema);


router.get('/', ensureAuthenticated, function(req, res){
//  console.log(' in the get method of the '+todos[i].item);

      Todo.find({}, function(err, data){
          if(err) throw err;
          res.render('index', {todos: data.reverse()});

      });
});


router.delete('/:item', function(req, res){

// delete the requested item from mongodb
console.log(' in the delete ');
Todo.find({ item: req.params.item.replace(/\-/g, " ")}).remove(function(err,data){

if(err) throw err;
res.json(data);
});

});

var urlencodedParser = bodyParser.urlencoded({extended: false});

router.post('/',urlencodedParser,  function(req, res,next){
console.log(' in the post method of the controller' );
// get data from the view and add it to mongodb
var newTodo = Todo(req.body).save(function(err,data){
//  console.log(' in the post method of the controller' );
  if(err) throw err;
  res.json(data);
})
  //res.render('index');
});


router.delete('/:item', function(req, res){
    console.log('delete has been called' );


// delete the requested item from mongodb
//Todo.find({ item: req.params.item.replace(/\-/g, " ")}).remove(function(err,data){

//if(err) throw err;
//res.json(data);
//});

});

function list(req, res )
{
  console.log('list has been called' );
}

function ensureAuthenticated(req, res , next){

  if(req.isAuthenticated()){

      return next();

  } else{

    req.flash('error message',' you are not logged in');
    res.redirect('/users/login');

  }
}

module.exports = router;
