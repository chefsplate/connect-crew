'use strict';

class CustomError extends Error {
	constructor(code, msg) {
		super(msg);

		this.message = `${code} ${msg}`;
		this.code = code;
		this.status = code;
	}
}

module.exports = CustomError;
