'use strict';

var assert = require('assert');
var back = require('../controllers/core.server.controller');

describe('Server back-end controllers', function() {
	describe('Vetting ID parser: core.server.controller.parseToID...', function() {
		describe('Welformed strings:', function() {
			it('UF Card Swipe', function() {
				var str = ';200644265430120064426543010?';
				var id = back.parseToID(str);
				assert.equal(id, '64426543');
			});
			it('Sante Fe Swipe', function() {
				var str = '%25501350084081 STUDENT?';
				var id = back.parseToID(str);
				assert.equal(id, '350084081');
			});
			it('Manual, UF_Straight', function() {
				var str = '78945612';
				var id = back.parseToID(str);
				assert.equal(id, '78945612');
			});
			it('Manual, SF_Straight', function() {
				var str = '789456128';
				var id = back.parseToID(str);
				assert.equal(id, '789456128');
			});
			it('Manual, numeric w/ spaces', function() {
				var str = ' 7 89 45 61 2 ';
				var id = back.parseToID(str);
				assert.equal(id, '78945612');
			});
			it('Manual, numeric w/ dashes', function() {
				var str = '78-94-56--1-2';
				var id = back.parseToID(str);
				assert.equal(id, '78945612');
			});
			it('Manual, numeric w/ periods', function() {
				var str = '.78.94.561...28';
				var id = back.parseToID(str);
				assert.equal(id, '789456128');
			});
			it('Manual, numeric w/ asterixes', function() {
				var str = '78*945*61*28**';
				var id = back.parseToID(str);
				assert.equal(id, '789456128');
			});
			it('Manual, numeric w/ slashes', function() {
				var str = '7/894/56/12/8';
				var id = back.parseToID(str);
				assert.equal(id, '789456128');
			});
			it('Manual, numeric w/ pluses', function() {
				var str = '+78+945+61+28';
				var id = back.parseToID(str);
				assert.equal(id, '789456128');
			});
			it('Manual, numeric MIX 1', function() {
				var str = '7/ 894+ 561**28';
				var id = back.parseToID(str);
				assert.equal(id, '789456128');
			});
			it('Manual, numeric MIX 2', function() {
				var str = ' 7 8+9.45.61-2//8';
				var id = back.parseToID(str);
				assert.equal(id, '789456128');
			});
			it('Manual, numeric w/ newline', function() {
				var str = '7/894/56/12/8\n';
				var id = back.parseToID(str);
				assert.equal(id, '789456128');
			});
		});
		describe('Malformed strings:', function() {
			it('Malformed UF Card Swipe, wrong prefix code', function() {
				var str = ';223644265430120064426543010?';
				var id = back.parseToID(str);
				assert.equal(id, null);
			});
			it('Malformed UF Card Swipe, no prefix code', function() {
				var str = ';644265430120064426543010?';
				var id = back.parseToID(str);
				assert.equal(id, null);
			});
			it('Malformed UF Card Swipe, no prefix \';\'', function() {
				var str = '200644265430120064426543010?';
				var id = back.parseToID(str);
				assert.equal(id, null);
			});
			it('Malformed UF Card Swipe, no suffix \'?\'', function() {
				var str = ';200644265430120064426543010';
				var id = back.parseToID(str);
				assert.equal(id, null);
			});
			it('Malformed UF Card Swipe, lost ID number data', function() {
				var str = ';2006440120064426543010?';
				var id = back.parseToID(str);
				assert.equal(id, null);
			});
			it('Malformed UF Card Swipe, wrong delimiter number', function() {
				var str = '200644265430120064426543010?';
				var id = back.parseToID(str);
				assert.equal(id, null);
			});
			it('Malformed Sante Fe Swipe, wrong prefix code', function() {
				var str = '%20201350084081 STUDENT?';
				var id = back.parseToID(str);
				assert.equal(id, null);
			});
			it('Malformed Sante Fe Swipe, missing prefix \'%\'', function() {
				var str = '25501350084081 STUDENT?';
				var id = back.parseToID(str);
				assert.equal(id, null);
			});
			it('Malformed Sante Fe Swipe, missing prefix', function() {
				var str = '01350084081 STUDENT?';
				var id = back.parseToID(str);
				assert.equal(id, null);
			});
			it('Malformed Sante Fe Swipe, missing suffix \'?\'', function() {
				var str = '%25501350084081 STUDENT';
				var id = back.parseToID(str);
				assert.equal(id, null);
			});
			it('Malformed Sante Fe Swipe, corrupted ID number', function() {
				var str = '%25501350881 STUDENT?';
				var id = back.parseToID(str);
				assert.equal(id, null);
			});
			it('All alphanumeric', function() {
				var str = 'alphabetical string.sdfhr';
				var id = back.parseToID(str);
				assert.equal(id, null);
			});
			it('Mixed random', function() {
				var str = ' sfdlak#sj$#$34.983(&42334yh ';
				var id = back.parseToID(str);
				assert.equal(id, null);
			});
			it('Numeric, but too short', function() {
				var str = '456';
				var id = back.parseToID(str);
				assert.equal(id, null);
			});
			it('Numeric, but too long', function() {
				var str = '45684624842887954';
				var id = back.parseToID(str);
				assert.equal(id, null);
			});
			it('Empty string', function() {
				var str = '';
				var id = back.parseToID(str);
				assert.equal(id, null);
			});
		});
	});
});