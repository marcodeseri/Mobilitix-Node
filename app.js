
var express = require('express');
var connect = require('connect');
var dateutils = require('date-utils');
var ga = require('./ga.js');
var sys = require('sys'); 

Accounts = Object; 
Data = Object;

Mobilitix = {
	configDate: { 
    	today: {
      		start: Date.today(),
      		end: Date.today()
    	},
    	yesterday:{
   	   		start: Date.yesterday(),
      		end:Date.yesterday()
    	}/*,     
    	lastweek:{
      		start: Date.addDays(-7),
      		end: Date.addDays(-7))
    	} */   	
	}
	
}

function gaAccounts(req,res,next){

	var GAA = new ga.GA({token:req.cookies.authtoken});
	var options = {'start-index':1}


	GAA.get(options, '/analytics/feeds/accounts/default?', function(err, entries) {
    	Accounts = entries
    	sys.debug(JSON.stringify(entries));
    });
    
   next();
}

function checkAuth(req, res, next){
	if(req.cookies.authtoken !== undefined){
		next();
	}else{
		res.redirect('/');
	}
}

function gaDash(req,res,next){

    var GAD = new ga.GA({token:req.cookies.authtoken});
	var opts = {
 		ids:req.params.id,
 		'start-date':'2011-03-01',
 		'end-date':'2011-05-10',
 		dimensions:'ga:pagePath',
 		metrics:'ga:pageviews,ga:bounces,ga:entrances',
 		sort:'-ga:pagePath'
 	}
 	
 	GAD.get(opts, '/analytics/feeds/data?', function(err, entries) {
    	Data = entries
    	sys.debug(JSON.stringify(entries));
    });
    
    next();
};





function gaAuth(req,res,next){
	if(req.body.username && req.body.password){
		var GA = new ga.GA({user:req.body.username,password:req.body.password});

		GA.login(function(err, token) {
			if(GA.token !== undefined){
				res.cookie('authtoken', GA.token.toString(), {expires: new Date(Date.now() + 31536000000)});

	    		res.redirect('/account')
			}else{
				next(new Error('Login Failed'));
			}
		});
	}	
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
    title: 'Select Site Profile',
    accounts: Accounts,
    startDate: Mobilitix.configDate.today.start.toYMD('-'), 
    endDate: Mobilitix.configDate.today.end.toYMD('-')
  });
});


app.get('/dashboard/:id', checkAuth, gaDash, function(req, res){
  res.render('dashboard', {
    title: 'Dashboard',
    data: Data
  });
});

// Only listen on $ node app.js

if (!module.parent) {
  app.listen(3000);
  console.log("Express server listening on port %d", app.address().port);
}
