# connect-crew [![Build Status](https://travis-ci.org/chefsplate/connect-crew.svg?branch=master)](https://travis-ci.org/chefsplate/connect-crew)

> [Connect](http://www.senchalabs.org/connect/)/[Express](http://expressjs.com/) middleware to validate if a user belongs to a group. Works nicely with [passport](http://passportjs.org/).


## Install

```
$ npm install --save connect-crew
```

### Requirements
* [Connect](http://www.senchalabs.org/connect/) or [Express](http://expressjs.com/)
* Node.js 4+
* An auth middleware like [passport](http://passportjs.org/)

## Usage

By default, **connect-crew** assumes your authentication middleware returns ``req.user.groups`` as an **Array**. Check [path option](#path) if you need to change it.

### Single request

```js
const express = require('express';)
const crew = require('connect-crew');
const passport = require('passport');

app.use(passport.authenticate('local'));

app.get('/maria-hill',
	crew('staff'),
	(req, res, next) => res.json({ result: true })
);

app.get('/black-widow',
	crew(['avenger', 'staff']),
	(req, res, next) => res.json({ result: true })
);
```

### All requests

```js
const express = require('express';)
const crew = require('connect-crew');
const passport = require('passport');

app.use(passport.authenticate('local'))
app.use(crew('staff'));
```

## API

### crew(input, [options])

#### input

Type: `string` or `array`

Groups to validate.

#### options

##### path

Type: `string`<br>
Default: `user.groups`

Groups array path inside `req` object.

##### error

Type: `object`<br>
Default: `{ code: 401, message: 'Unauthorized'}`

Error message when user doesn't belong to a group.

#### Default options

```js
crew.options({
	path: 'member.crew',
	error: {
		code: 401,
		message: 'You are not welcome'
	}
});
```

## Develop
Inside the project folder:

```shell
npm i
npm start
```

## License

MIT © [Chef's Plate](http://chefsplate.com)
