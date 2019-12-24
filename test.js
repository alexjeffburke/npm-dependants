const { test } = require('tap')
const dependants = require('.')

test('dependants', async t => {
  const names = []
  for (const dependant of await dependants('dependants-stream-test-a')) {
    names.push(dependant)
  }
  t.deepEqual(names, ['dependants-stream-test-b'])
})
