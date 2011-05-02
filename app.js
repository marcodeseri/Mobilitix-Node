
/**
 * Module dependencies.
 */

var express = require('express');
var connect = require('connect');
var ga = require('./ga.js');
var sys = require('sys'); 

 

function gaAccounts(req,res,next){
	sys.debug('accounts'+req.cookies.authtoken)
	var GAA = new ga.GA({token:req.cookies.authtoken});
	var options = {'start-index':1}
	
	
	GAA.get(options, '/analytics/feeds/accounts/default?', function(err, entries) {
    	//sys.debug(JSON.stringify(entries));
    });
    
   next();
}


function checkAuth(req, res, next){
	if(req.cookies.authtoken !== undefined){
		next();
	}else{
		next(new Error('User Unauthenticated'));
	}
}

function gaAuth(req,res,next){
	
	if(req.body.username && req.body.password){
		var GA = new ga.GA({user:req.body.username,password:req.body.password});

		GA.login(function(err, token) {
			if(GA.token !== undefined){
				res.cookie('authtoken', GA.token.toString(), {expires: new Date(Date.now() + 31536000000)});
				
				
	    		
	    		/*var options = {'start-index':1};
	    		GA.get(options, '/analytics/feeds/accounts/default?', function(err, entries) {
	                         sys.debug(JSON.stringify(entries));
	                       });   
	    		
	    		sys.debug('authenticated')*/
	    		res.redirect('/account')
			}else{
				next(new Error('Login Failed'));
			}
		});
	}
				

       /*var options = {
         'ids': 'ga:16987305',
     'start-date': '2011-03-01',
     'end-date': '2011-03-30',
     'dimensions': 'ga:source',
     'metrics': 'ga:visits',
     'sort': '-ga:visits'
       };
       
       data feeed:
       GA.get(options, '/analytics/feeds/data?', function(err, entries) {
                         sys.debug(JSON.stringify(entries));
                       });
                       
                       
      account feed:
                
                       
     */
    	     	
    
	
}

     
     
var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.methodOverride());
  app.use(express.session({ secret: "mobilitix rules" }));
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
	sys.debug(req.cookies.authtoken)
	if(req.cookies.authtoken === undefined){
		res.render('index', {
			title: 'Mobilitix'
		});	
	}else{
		res.redirect('/account')
	}	
  
});


app.post('/auth', gaAuth, function(req, res, next){
  res.redirect('/account')
});

app.get('/account', checkAuth, gaAccounts, function(req, res){
  res.render('account', {
    title: 'Select Site Profile'
  });
});


// Only listen on $ node app.js

if (!module.parent) {
  app.listen(3000);
  console.log("Express server listening on port %d", app.address().port);
}
