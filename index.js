// the middleware function
module.exports = function() {
    return function(req, res, next) {
		var array = /(.*)\.(?:(?:.*)\.(?:.*)|localhost)/i.exec(req.host);
		if(array != null && array.length > 0)
		{
			if(array[1] != 'www'){
				var subdomains = array[1].split('.').join('/');
				req.url = '/' + subdomains + req.url;
			}
		}
    	next();
    }
    
};