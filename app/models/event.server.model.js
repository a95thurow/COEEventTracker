'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Event Schema
 */
var EventSchema = new Schema({
	name: {
		type: String,
		default: '',
		trim: true
	},
	details: {
		type: String,
		default: '',
		trim: true
	},
	date: {
		type: String,
		default: '',
		trim: true
	},
	time: {
		type: String,
		default: '',
		trim: true
	},
	pointValue: {
 		type: Number,
 		default: '',
 		trim: true
	},
	studentIDs: [{
		ufid : String, 
		time : String,
		peerFirst: String,
		peerLast: String
	}]

});

mongoose.model('Event', EventSchema);