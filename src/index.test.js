import Router from './index';

test('Simple routing setup', () => {
  const router = new Router();

  router
    .add(() => {})
    .add('home', () => {})
    .listen();

  window.location.hash = 'home';

  expect(router.currentRoute).toEqual('home');
});

test('Simple routing setup with navigate', () => {
  const router = new Router();

  router
    .add(() => {})
    .add('home', () => {})
    .listen();

  window.location.hash = 'home';

  router.navigate('');

  expect(router.currentRoute).toEqual('');
});

test('Routing add', () => {
  const method = () => {};
  const router = new Router();

  router.add('home', method);

  expect(router.routes[0].route).toEqual(/home/);
  expect(router.routes[0].handler).toEqual(method);
});

test('Routing remove', () => {
  const router = new Router();

  router.add('home', () => {});
  router.remove('home');

  expect(router.routes[0]).toBeUndefined();
});

test('Routing remove wrong', () => {
  const router = new Router();

  router.add('home', () => {});
  router.remove('hom');

  expect(router.routes[0].route).toEqual(/home/);
});

test('Routing remove method', () => {
  const method = () => {};
  const router = new Router();

  router.add('home', method);
  router.remove('home', method);

  expect(router.routes[0]).toBeUndefined();
});

test('Routing remove wrong method', () => {
  const method = () => 1;
  const router = new Router();

  router.add('home', method);
  router.remove('home', () => 2);

  expect(router.routes[0]).toBeDefined();
});

test('Routing remove multiple', () => {
  const router = new Router();

  router.add('test', () => 1);
  router.add('home', () => 2);
  router.add('last', () => 3);
  router.remove('home');

  expect(router.routes[0].route).toEqual(/test/);
  expect(router.routes[1].route).toEqual(/last/);
});

test('Reload', () => {
  const router = new Router(false, false);

  let i = 0;

  router.add('test', () => {});
  router.add('home', () => {});
  router.add('last', () => {
    i = 3;
  });

  window.location.hash = '/last';

  expect(i).toEqual(0);

  router.reload();

  expect(i).toEqual(3);
});
