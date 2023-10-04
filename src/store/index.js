import stickyWall from "./modules/stickyWall";

import { createStore } from 'vuex';

const store = createStore({
  modules: {
    stickyWall,
  },
});

export default store;