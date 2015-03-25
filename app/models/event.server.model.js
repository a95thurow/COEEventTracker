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
<<<<<<< HEAD
	}
=======
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
 		type: String,
 		default: '',
 		trim: true
	}

>>>>>>> 22e8ecb8172439689806405d1fb24763fc218988
});

mongoose.model('Event', EventSchema);