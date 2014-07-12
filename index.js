// the middleware function
module.exports = function() {
    return function(req, res, next) {
		var array = /(.*)\.(?:.*)\.(?:.*)/i.exec(req.host);

		if(array != null)
		{
			var subdomain = array[1];
			req.url = subdomain + '/' + req.url; 
		}
    	next();
    }
    
};