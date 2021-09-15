# @modusbox/microfrontend-utils

A collection of Typescript utilities for the frontend apps.

### Installation

To install the module simply run `yarn add @modusbox/microfrontend-utils`.

### Usage

```ts
// import everything
import * as utils from '@modusbox/microfrontend-utils';
await utils.async.sleep(10);

// import all from module
import * as async from '@modusbox/microfrontend-utils/lib/async';
await async.sleep(10);

// import from module as named export 
import { sleep } from '@modusbox/microfrontend-utils/lib/async';
await sleep(10);

// import a single utility
import sleep from '@modusbox/microfrontend-utils/lib/async/sleep';
await sleep(10);

// import a type
import { TextFileContent } from '@modusbox/microfrontend-utils/lib/file';
```

Modules available:

- [async](./async/README.md)