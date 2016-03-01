import test from 'ava';
import crew from './';

test('single group call', t => {
  t.plan(1);

  const req = {
    user: {
      groups: ['avenger']
    }
  };
  const res = {};
  const next = err => t.ifError(err);

  crew('avenger')(req, res, next);
});

test('single group call error', t => {
  t.plan(2);

  const req = {
    user: {
      groups: ['staff']
    }
  };
  const res = {};
  const next = err => {
    t.same(err.message, '401 Unauthorized');
    t.same(err.status, 401);
  };

  crew('avenger')(req, res, next);
});

test('multiple group call', t => {
  t.plan(2);

  const req = {
    user: {
      groups: ['avenger']
    }
  };
  const res = {};
  const next = err => t.ifError(err);

  crew(['avenger', 'staff'])(req, res, next);

  const req2 = {
    user: {
      groups: ['avenger', 'staff']
    }
  };
  const res2 = {};
  const next2 = err => t.ifError(err);

  crew(['avenger'])(req2, res2, next2);
});

test('multiple group call error', t => {
  t.plan(2);

  const req = {
    user: {
      groups: ['foobar']
    }
  };
  const res = {};
  const next = err => {
    t.same(err.message, '401 Unauthorized');
    t.same(err.status, 401);
  };

  crew(['avenger', 'staff'])(req, res, next);
});

test('option:path', t => {
  t.plan(1);

  const req = {
    member: {
      crew: ['avenger']
    }
  };
  const res = {};
  const next = err => t.ifError(err);

  crew('avenger', { path: 'member.crew' })(req, res, next);
});

test('option:path error', t => {
  t.plan(2);

  const req = {
    member: {
      crew: ['avenger']
    }
  };
  const res = {};
  const next = err => {
    t.same(err.message, '401 Unauthorized');
    t.same(err.status, 401);
  };

  crew('avenger', { path: 'uasgdiugsad' })(req, res, next);
});

test('option:error', t => {
  t.plan(2);

  const req = {};
  const res = {};
  const next = err => {
    t.same(err.message, '404 Not found');
    t.same(err.status, 404);
  };

  crew('avenger', { error: {
    code: 404,
    message: 'Not found'
  } })(req, res, next);
});

test('crew.options', t => {
  t.plan(3);

  const req = {
    member: {
      crew: ['avenger']
    }
  };
  const res = {};

  crew.options({
    path: 'member.crew'
  });

  crew('avenger')(req, res, err => t.ifError(err));

  // reset options
  crew.options({});

  crew.options({
    error: {
      code: 403,
      message: 'Forbidden'
    }
  });

  crew('asdasd')(req, res, err => {
    t.same(err.message, '403 Forbidden');
    t.same(err.status, 403);
  });
});
