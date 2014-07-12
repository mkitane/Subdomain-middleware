// the middleware function
module.exports = function(options) {
	//WARNING : Our regex doesn't detect second leved domains, if you have so, please specify the baseURL
	//Example of second level domain : .co.uk
	//For more informations please refer to http://en.wikipedia.org/wiki/Second-level_domain

	//Check if the baseURL option is activated
    var options = options || {};
	options.baseURL = options.baseURL || false;

	//Create the corresponding Regex according to options
	if(options.baseURL)
	{
		var regex = new RegExp("(.*)\.(?:" + escapeRegExp(options.baseURL) + "|localhost)",'i');
	}else
	{
		var regex = /(.*)\.(?:(?:.*)\.(?:.*)|localhost)/i;
	}

    return function(req, res, next) {
 		//Apply the regex and get the subdomains
		var array = regex.exec(req.host);
		if(array != null && array.length > 0)
		{
			//If we detect the subdomain as www we don't do anything
			if(array[1] != 'www'){
				var subdomains = array[1].split('.').join('/');
				req.url = '/' + subdomains + req.url;
			}
		}
		
		//Go to the next middleware
    	next();
    }  
};

function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}