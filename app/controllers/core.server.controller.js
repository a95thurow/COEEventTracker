'use strict';

/**
 * Module dependencies.
 */
exports.index = function(req, res) {
	res.render('index', {
		user: req.user || null,
		request: req
	});
};

//var IDREGEX = /^(?:(?:;\d{3})(\d{8}))|(?:(?:%\d{5})(\d{9}))|((?:\d[\s\-\.]*){8,9})[\n\r]*$/m;
var REX_UF = /^;200(\d{8})01200[\d]*\?[\n\r]?$/;
//var REX_SF = /^(?:%\d{5})(\d{9}) \w*\?[\n\r]*$/;
var REX_SF = /^%25501(\d{9}) \w*\?[\n\r]*$/;
var REX_INVAL = /[^\d\s/\*\-\+\.]/;
var REX_ONUM = /(\d)/;

/**
 * Alex Stewart
 * Function to parse incoming strings into valid IDs
 */
exports.parseToID = function(string) {
	//var id = string.match(IDREGEX)
	var id;
	id = REX_UF.exec(string, 'm');
	if (null !== id && 'undefined' !== typeof id[1]) {
		return id[1];
	}
	
	id = REX_SF.exec(string, 'm');
	if (null !== id && 'undefined' !== typeof id[1]) {
		return id[1];
	}
	
	id = REX_INVAL.exec(string);
	if (null !== id && id.length > 0) {
		return null;
	}
	
	id = string.match(/(\d)/g);
	if (null !== id && (id.length === 8 || id.length === 9)) {
		var ret = '';
		for (var i = 0; i < id.length; i++) {
			ret += id[i];
		}
		return ret;
	}
	
	return null;
};