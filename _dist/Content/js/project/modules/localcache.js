define([
], 
function () 
{

	var LocalCache = function ()
	{
	};   
   
	LocalCache.prototype =	 
	{
		hasFreshItem : function(key, timeout)
		{
			if(!window.localStorage)
				return false;
			if(timeout === undefined || timeout === null)
				timeout = 300;
			
			var lastTime = window.localStorage.getItem('_cache_|' + key + '|_time');
			if(!lastTime)
				return false;

			var now = parseInt((new Date()).getTime() / 1000, 10);

			var remaining = timeout - (now - lastTime);

			return (remaining > 0);
		},
		saveItem : function(key, timeout, item)
		{
			if(!window.localStorage)
				return false;
			var now = parseInt((new Date()).getTime() / 1000, 10);
			window.localStorage.setItem('_cache_|' + key + "|_data", JSON.stringify(item));
			window.localStorage.setItem('_cache_|' + key + "|_time", now);
			return true;
		},
		getItem : function(key)
		{
			if(!window.localStorage)
				return false;
			return JSON.parse(window.localStorage.getItem('_cache_|' + key + '|_data'));
		},
		clear : function(containsTextLst) // pass in nothing to clear everything, otherwise a list of text blobs to delete if containing.
		{
			if(!window.localStorage)
				return false;
			window.localStorage.clear();
		},


		getKeyPartFromObj : function(obj)
		{
			if(!obj)
				return '';

			var keys = [];
			var retLst = [];

			for(var key in obj)
			{
				if(!obj.hasOwnProperty(key))
					continue;
				keys.push(key);
			}
			keys = keys.sort();
			for(var i=0; i < keys.length; i++)
				retLst.push(keys[i] + '=' + obj[keys[i]]);
			
			return '(' + retLst.join(',') + ')';
		}
				
	};

	
	var oLocalCache = new LocalCache();	
	return (oLocalCache); 

});
// vim:set ts=8 shiftwidth=8 softtabstop=8 noexpandtab :
