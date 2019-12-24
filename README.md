# npm-dependants

Get dependants of a module on npm.

> This is a fork of `npm-dependants` that exposes a standard iterator.

## Usage

```js
const dependants = require('@alexjeffburke/npm-dependants')

for (const dependant of await dependants('express')) {
  console.log(dependant)
  // webpack-dev-server
  // webpack-bundle-analyzer
  // ...
}
```

## Installation

```bash
$ npm install @alexjeffburke/npm-dependants
```

## Implementation

Since there is [no reliable api](https://twitter.com/juliangruber/status/1209066065550028801) for querying dependant packages currently, this module scrapes [npmjs.com](https://npmjs.com) - at the risk of npm changing their DOM. If you notice anything breaking, please open an issue 🙇‍♂️.
