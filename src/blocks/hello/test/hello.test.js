import test from 'ava'
import { spy } from 'sinon'
import { sayHello } from '../index.js'

test('should prints to console with given name', t => {
  spy(console, 'log')

  sayHello('foo')

  t.is(console.log.callCount, 1)
  t.deepEqual(console.log.firstCall.args, ['Hello foo!'])
})
