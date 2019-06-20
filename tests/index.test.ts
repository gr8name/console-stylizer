import {Console, init} from '../src';

test('test function', () => {
  expect(init(Console.Warn)).toBeUndefined();
});
