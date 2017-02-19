'use strict';

import { testHmr } from './blocks/basic/basic';

testHmr();

if (module.hot) {
  module.hot.accept();
}

