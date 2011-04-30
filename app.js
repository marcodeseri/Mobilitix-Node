
/**
 * Module dependencies.
 */

var express = require('express');
var connect = require('connect');
var ga = require('./ga.js');
var sys = require('sys'); 

 
 


function gaAuth(req,res,next){
	
	var GA = new ga.GA({user:req.body.username,password:req.body.password});
	
	
	
	GA.login(function(err, token) {
		if(GA.token !== undefined){
			res.cookie('gaToken', GA.token);
			sys.debug(GA.token)
    		res.redirect('/about')
		}
			

       /*var options = {
         'ids': 'ga:16987305',
     'start-date': '2011-03-01',
     'end-date': '2011-03-30',
     'dimensions': 'ga:source',
     'metrics': 'ga:visits',
     'sort': '-ga:visits'
       };
       GA.get(options, function(err, entries) {
                         sys.debug(JSON.stringify(entries));
                       });
                       
     */
    	
     });
	
}

     
     
var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.methodOverride());
  app.use(express.session({ secret: "keyboard cat" }));
  app.use(require('stylus').middleware({ src: __dirname + '/public' }));  
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes
app.get('/', function(req, res){
	if(req.cookies.gaToken === undefined){
		res.render('index', {
			title: 'Mobilitix'
		});	
	}else{
		res.redirect('/about')
	}	
  
});


app.post('/auth', gaAuth, function(req, res, next){
  if(GA.token)
  	next();
});

app.get('/about', function(req, res){
  res.render('about', {
    title: '1' + GA.token
  });
});


// Only listen on $ node app.js

if (!module.parent) {
  app.listen(3000);
  console.log("Express server listening on port %d", app.address().port);
}
