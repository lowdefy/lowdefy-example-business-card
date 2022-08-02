import * as adapters from './auth/adapters.js';
import * as blocks from './blocks.js';

export default {
  auth: {
    adapters: Object.keys(adapters),
  },
  blocks: Object.keys(blocks),
};
