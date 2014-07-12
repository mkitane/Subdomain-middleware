// the middleware function
module.exports = function() {
    return function(req, res, next) {
    	console.log("HOST : " + req.host);

		var array = /(.*)\.(?:(?:.*)\.(?:.*)|localhost)/i.exec(req.host);
		console.log(array);
		if(array != null)
		{
			var subdomain = array[1];
			req.url = '/' + subdomain + '/' + req.url; 
		}
    	next();
    }
    
};
