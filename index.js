'use strict';

// Note: THIS IS NOT BABEL TRANSPILED CODE, different than tests
const dotProp = require('dot-prop');
const includes = require('./lib/includes');
const CustomError = require('./lib/CustomError');

const defaultOptions = {
	path: 'user.groups',
	error: {
		code: 401,
		message: 'Unauthorized'
	}
};

let customOptions = {};

const crew = (groups, options) => (req, res, next) => {
	const config = Object.assign({}, defaultOptions, customOptions, options);
	const groupList = groups.forEach ? groups : [groups];
	const payload = dotProp.get(req, config.path);

	if (groupList.filter(item => includes.call(payload, item)).length) {
		next();
	} else {
		next(new CustomError(config.error.code, config.error.message));
	}
};

crew.options = options => (customOptions = options);

module.exports = crew;
