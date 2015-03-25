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

var REX_UF = /^;200(\d{8})01200[\d]*\?[\n\r]?$/;

//var IDREGEX = /^(?:(?:;\d{3})(\d{8}))|(?:(?:%\d{5})(\d{9}))|((?:\d[\s\-\.]*){8,9})[\n\r]*$/m;
var REX_UF = /^;200(\d{8})01200[\d]*\?[\n\r]?$/;
//var REX_SF = /^(?:%\d{5})(\d{9}) \w*\?[\n\r]*$/;

var REX_UF = /^;200(\d{8})01200[\d]*\?[\n\r]?$/;
var REX_SF = /^%25501(\d{9}) \w*\?[\n\r]*$/;
var REX_INVAL = /[^\d\s/\*\-\+\.]/;
var REX_ONUM = /(\d)/;

/**
 * Alex Stewart
 * Function to parse incoming strings into valid IDs
 */
exports.parseToID = function(string) {

	// validate string existence and type
	if (string === null || typeof string != 'string') { return null; }
	
	// parse from UFID card string

	//var id = string.match(IDREGEX)
	var id;
	id = REX_UF.exec(string, 'm');
	if (null !== id && 'undefined' !== typeof id[1]) {
		return id[1];
	}
	

	// parse from SFID card string

	id = REX_SF.exec(string, 'm');
	if (null !== id && 'undefined' !== typeof id[1]) {
		return id[1];
	}
	

	// otherwise, assume we are working with an manual entry
	// throw it out immediately, if it contains invalid characters
	id = REX_INVAL.exec(string);
	if (null !== id && id.length > 0) {
		return null;
	}
	
	// otherwise, pull out all of the digits
	id = string.match(/(\d)/g);
	if (null !== id && (id.length === 8 || id.length === 9)) {
		var ret = '';
		for (var i = 0; i < id.length; i++) {
			ret += id[i];
		}
		return ret;
	}
	
	// throw it out, still, if you don't pull out 8 OR 9 digits
	return null;
};