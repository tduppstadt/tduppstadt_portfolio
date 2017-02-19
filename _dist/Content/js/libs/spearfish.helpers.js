// console log fix.
if (typeof console === "undefined")
{
	if (!document.getElementById('firebug-lite')) 
	{
		console = 
		{			
			log   :function(){},
			warn  :function(){},
			error :function(){},
			trace :function(){}
		};
	}
}

window.helpers =
{
	// ______________________________________________________________
	//											      getDependencies
	// to help define dependencies for require modules
	/*
		Usage:
		var dep = ["depend1", "depend3", "depend4"];
        window.helpers.getDependencies(dep, function()
        {  
            self.oDepend1 = require("depend1");
            self.oDepend3 = require("depend3");   
            self.oDepend4 = require("depend4");
            self.init();
        });
	*/
	getDependencies: function (dep, callback)
	{
		var loopCount = 0;

		var depCheck = function()
		{
			var myCount = 0;
			

			for (var i = 0; i < dep.length; i++)
			{
				if (require.specified(dep[i]))
				{
					myCount++;
				}				
			}

			if (myCount === dep.length)
			{
				callback();
			}
			else
			{
				doTimeoutLoop();
			}
		};

		var doTimeoutLoop = function()
		{
			loopCount ++;

			if (loopCount < 100)
			{
				var timeoutLoop = setTimeout(function()
				{
					depCheck();			
				}, 100);
			}
			else
			{
				console.error("! <window.helpers.getDependencies> Time out! Check dependency list for invalid paths: ", dep);
			}
			
		};
		
		doTimeoutLoop();
	},

	// ______________________________________________________________
	//													   	   absorb
	// absorb one object into another
	absorb: function(destination /*:Object*/, source /*:Object*/, overwrite /*:Boolean*/) 
	{
	    for (var key in source) 
	    {
	        if (overwrite || typeof destination[key] == "undefined")
	        {
	            destination[key] = source[key];
	        }
	    }
	},

	// ______________________________________________________________
	//													   		clone
	// Clone object
	clone: function (objToClone)
	{
		return(jQuery.extend(true, {}, objToClone));
	},

	// ______________________________________________________________
	//													   hideUrlBar
	// use this for mobile devices to hide the url navbar
	hideUrlBar: function ()
	{
		window.scrollTo(0, 1);
	},

	// ______________________________________________________________
	//													  loadBgImage
	loadFadeBgImage: function (element, imagePath)
	{
		//	$(element).css("opacity", "0"); 
		
		var imageObj = new Image(); 
		
		try
		{			
			imageObj.load (imagePath, function () 
			{	
				if ($(element).length !== 0)
				{	
					$(element).css('background-image', 'url(' + imagePath + ')');
					TweenLite.to($(element), 1, {css:{autoAlpha:1}, overwrite:"all"});	
				}						   		
			});
		}
		catch(e)
		{			
			$(element).css('background-image', 'url(' + imagePath + ')');
			TweenLite.to($(element), 1, {css:{autoAlpha:1}, overwrite:"all"});	
		}
		

	},


	// ______________________________________________________________
	//                                             setBackgroundImage
	setBackgroundImage: function (element, imagePath)
	{
		element.css('background-image', 'url(' + imagePath + ')'); 
		element.css('background-repeat', 'no-repeat'); 
	},


	// ______________________________________________________________
	//                                                getWordWrapList
	getWordWrapList: function (src)
	{
		var wrapList = [];
		var current = $(src);    
		var text = current.text();

		var words = text.split(' ');

		current.text(words[0]);
		var height = current.height();

		for(var i = 1; i < words.length; i++)
		{
			current.text(current.text() + ' ' + words[i]);

			if(current.height() > height)
			{
				height = current.height();
				wrapList.push(words[i-1]);
			}
			if (i+1 == words.length)
			{
				wrapList.push(words[i]);
			}
		}   
		return (wrapList);
	},

	// ______________________________________________________________
	//                                               removeWhitespace
	removeWhitespace: function (str)
	{
		return(str = str.replace(/ /g,''));
	},

	// ______________________________________________________________
	//                                            removeSpecialChars
	removeSpecialChars: function (str)
	{
		str = str.replace(/[^A-Za-z0-9 ;]/g, " ");
		str = str.replace(/\s+/g, " ");
		return(str);
	},

	// ______________________________________________________________
	//                                                     removeHTML
	removeHtml: function (str)
	{		
		str = $.parseHTML(str);	
		var newStr = "";
		if (str)
		{
			for (var i = 0; i < str.length; i++)
			{
				if (str[i].nodeName === "#text")
				{
					newStr += str[i].wholeText;
				}
			}
		}
		
		return(newStr);
	},

	// ______________________________________________________________
	//                                                    cleanString
	cleanString: function (str)
	{
		str = this.removeHtml(str);
		str = this.removeSpecialChars(str);
		return(str);
	},

	
	// ______________________________________________________________
	//                                           cleanStringTitleCase
	cleanStringTitleCase: function (str)
	{
		str = this.removeHtml(str);
		str = this.removeSpecialChars(str);
		str = this.toTitleCase(str);
		return(str);
	},

	// ______________________________________________________________
	//                                                    toTitleCase
	toTitleCase: function (str)
	{
		return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
	},

	// ______________________________________________________________
	//                                             		   replaceAll
	replaceAll: function(str, find, replace) 
	{
	  return str.replace(new RegExp(this.escapeRegExp(find), 'g'), replace);
	},
	escapeRegExp: function(str) 
	{
	  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
	},

	// ______________________________________________________________
	//                                             		     isMobile
	isMobile:
	{
	    Android: function() {
	        return navigator.userAgent.match(/Android/i);
	    },
	    BlackBerry: function() {
	        return navigator.userAgent.match(/BlackBerry/i);
	    },
	    iOS: function() {
	        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	    },
	    Opera: function() {
	        return navigator.userAgent.match(/Opera Mini/i);
	    },
	    Windows: function() {
	        return navigator.userAgent.match(/IEMobile/i);
	    },
	    any: function() {
	        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
	    }
	},


	// ______________________________________________________________
	//                                             		   replaceAll
	strToBool: function(str)
	{		
		var result = false;
		if (str.toLowerCase() === "true" )
		{
			result = true;
		}			
		return(result);		
	},

	// ______________________________________________________________
	//                                           getCommonArrayValues
	getCommonArrayValues: function(a, b)
	{
		a = a.sort();
		b = b.sort();
		var i = 0, j = 0;
		var common = [];	
		for (var list1 = 0; list1 < a.length; list1++)
		{
		  for (var list2 = 0; list2 < b.length; list2++)
		  {
		      if (a[list1] === b[list2])
		      {			      	
		        common.push(a[list1]);            
		      }        
		  }    
		}
		return(common);
	},


	// ______________________________________________________________
	//                                                       iePngFix
	iePngFix: function(target)
	{
		var imgSrc;
		if (target)
		{
			// fix on element
			if (target.src) 
            {
                imgSrc = target.src;
                if (imgSrc.substr(imgSrc.length-4) === '.png' || imgSrc.substr(imgSrc.length-4) === '.PNG') 
                {
                    target.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled='true',sizingMethod='crop',src='" + imgSrc + "')";
                }
            }
		}
		else
		{
			// global fix
			var i;
            for (i in document.images) 
            {
                if (document.images[i].src) 
                {
                    imgSrc = document.images[i].src;
                    if (imgSrc.substr(imgSrc.length-4) === '.png' || imgSrc.substr(imgSrc.length-4) === '.PNG') 
                    {
                        document.images[i].style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled='true',sizingMethod='crop',src='" + imgSrc + "')";
                    }
                }
            }
		}
	},	

	// ______________________________________________________________
	//                                               parseQuerystring
	parseQuerystring: function ()
	{			
		if (window.location.href.split('?').length === 1)
		{
			return {};
		}

		var foo = window.location.href.split('?')[1].split('#')[0].split('&');
	    var dict = {};
	    var elem = [];
	    for (var i = foo.length - 1; i >= 0; i--) {
	        elem = foo[i].split('=');
	        dict[elem[0]] = elem[1];
	    };
	    return dict;			
	},	

	// ______________________________________________________________
	//                                                   shuffleArray
	shuffleArray: function (array)
	{
		var tmp, current, top = array.length;

	    if(top) while(--top) {
	    	current = Math.floor(Math.random() * (top + 1));
	    	tmp = array[current];
	    	array[current] = array[top];
	    	array[top] = tmp;
	    }

	    return array;
	},

	// ______________________________________________________________
	//                                                      padNumber
	// padNumber(9, 4);  // "0009"
	padNumber: function (number, digits)
	{
		return Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number;
	},


	// ______________________________________________________________
	//                                                   objToString
	objToString: function (obj)
	{		
	    var str = '';
	    for (var p in obj) 
	    {
	        if (obj.hasOwnProperty(p)) 
	        {
	            str += p + '::' + obj[p] + '<br/>';
	        }
	    }
	    return str;
		
	},
	
	// ______________________________________________________________
    //                                                       cleanUrl
    cleanUrl: function(url) 
    {
		return url.split("?")[0].split("#")[0];
    },

	// ______________________________________________________________
    //                                                     validEmail
    validEmail: function(e) 
    {
    
	    var filter = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
	    return String(e).search (filter) != -1;
    },


	// ______________________________________________________________
    //                                                     toTitleCase
    toTitleCase: function(str) 
    {    	
    	return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    },


	// ______________________________________________________________
    //                                                     allCookies
    allCookies: 
    {
        getItem: function (sKey) 
        {
            if (!sKey || !this.hasItem(sKey)) { return null; }
            return unescape(document.cookie.replace(new RegExp("(?:^|.*;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"), "$1"));
        },

        setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) 
        {
            if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return; }
            var sExpires = "";
            if (vEnd) 
            {
                switch (vEnd.constructor) 
                {
                    case Number:
                        sExpires = vEnd === Infinity ? "; expires=Tue, 19 Jan 2038 03:14:07 GMT" : "; max-age=" + vEnd;
                        break;
                    case String:
                        sExpires = "; expires=" + vEnd;
                        break;
                    case Date:
                        sExpires = "; expires=" + vEnd.toGMTString();
                        break;
                }
            }
            document.cookie = escape(sKey) + "=" + escape(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
        },

        removeItem: function (sKey, sPath) 
        {
            if (!sKey || !this.hasItem(sKey)) { return; }
            document.cookie = escape(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sPath ? "; path=" + sPath : "");
        },

        hasItem: function (sKey) 
        {
            return (new RegExp("(?:^|;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
        },
        keys: function () 
        {
            var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
            for (var nIdx = 0; nIdx < aKeys.length; nIdx++) 
            { 
                aKeys[nIdx] = unescape(aKeys[nIdx]); 
            }
            return aKeys;
        }
    },

    // ______________________________________________________________
    //                                               deserializeArray
    // used with $().serializeArray() to convert it to an object to be sent for ajax
    deserializeArray: function(a)
    {	
    	var output = {};
    	for (var i = 0; i < a.length; i++)
    	{    		
    		output[a[i].name] = a[i].value;
    	}
    	return (output);
    },

    // ______________________________________________________________
    //                                                removeFromArray
    // remove value from array
    removeFromArray: function(a, val)
    {	
		var idx = a.indexOf(val);

		if (idx != -1) 
		{
			a.splice(idx, 1);
		}

		return a;
    },

    // ______________________________________________________________
    //                                               parseDateTimeObj
    /*
        Takes an ISO 8661 format and parses it into usable date & time
        {
            date: "10/29/2014",
            time: "2:15 PM"
        }
    */
    parseDateTimeObj: function(isoString)
    {
    	var self = this;
        var temp = new Date(isoString);

        // parse date         
        var date = temp.toLocaleDateString();

        // parse time
        var hour = temp.getHours();
        var meridiem = " AM";
        if (hour >= 12) 
        {
            hour-=12;   
            if (hour !== 24)
            {
				meridiem = " PM";
            }    
        }
        if (hour === 0) 
    	{
    		hour = 12; 
    		meridiem = " AM";
    	}
        var minute = self.padNumber(temp.getMinutes(), 2);        

        var time = hour + ":" + minute + meridiem;

        return(
        {
            date: date,
            time: time
        });

    },

    // ______________________________________________________________    
	//                                                   militaryTime
    /* 
        Converts military time.
        Used to convert back into ISO 8861 format
        "10:18 PM" ->
        {
			hour: 22,
			minute: 18
        }
    */
    militaryTime: function(time)
    {
        var self = this,
        	temp,
            hour,
            minutes;

        try
        {
            time = time.split(" ");
            
            temp = time[0].split(":");    
            minute = Number(temp[1]);

            // set valid minutes
            if (isNaN(minute))
            {
                minute = 0;
            }


            // AM/PM
            hour = Number(temp[0]);
            if (time[1] === "PM" && hour !== 12) hour = Number(temp[0]) + 12;
            if (time[1] === "AM" && hour === 12) hour = 0;
        }
        catch(e)
        {                
            hour = 0;
            minute = 0;
        }            

		// pad number
        minute = self.padNumber(minute, 2);

        return(
        {
            hour: hour,
            minute: minute
        });
    },

    // ______________________________________________________________    
	//                                                   checkNested
    /* 
        test for existence of nested object key

        var test = {level1:{level2:{level3:'level3'}} };
		checkNested(test, 'level1', 'level2', 'level3'); // true
		checkNested(test, 'level1', 'level2', 'foo'); // false
    */
	checkNested: function(obj) 
	{
		var args = Array.prototype.slice.call(arguments),
		obj = args.shift();

		for (var i = 0; i < args.length; i++) 
		{
			if (!obj || !obj.hasOwnProperty(args[i])) 
			{
				return false;
			}
			obj = obj[args[i]];
		}
		return true;
	}

	
};
