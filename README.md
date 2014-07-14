Subdomain-middleware
====================

A simple middleware that handles subdomains for expressJS

##Installation
Just like a regular npm package :

	npm install subdomain-middleware

##Configuration
In your local machine, open the host file :

	/private/etc/hosts	#Linux/Mac
	C:\Windows\System32\Drivers\etc\hosts  #Windows
	
Add the subdomains : 

	127.0.0.1       api.localhost
	127.0.0.1       example.localhost

You're ready to use the middleware.

##Usage
Import the middleware using the require function.
Before any route specified, add the subdomain to the middleware stack.
The middleware transform subdomain into routes, e.g
	
	http://api.example.com/ will route you to /api/
	http://api.example.com/foo/bar will route to /api/foo/bar
Intercept the route and do what you have to do ! 	

Minimal example :

	var express = require('express');
	var subdomain = require('subdomain-middleware');

	var app = express();
	app.use(subdomain());

	app.get("/", function(req, res){
    	res.send("Welcome");
	});
	app.get('/api/',function(req,res){
    	res.send("Welcome API");
	});

	app.listen( 8080, "127.0.0.1");
	module.exports = app;
	
##Options :
baseURL (optional) : 

*	The middleware doesn't detect second leved domains and will not because the only way to do it efficiently is to maintain a list of second level domains. If you have so, the best solution is to specify the baseURL of your website. 
*	Example : app.use(subdomain({baseURL:"example.co.uk"}));