import * as types from './mutations-types';

const mutations = {
  [types.SET_TABS](state, tabs) {
    state.tabs = tabs;
  },
  [types.SET_NEWSCATEGORYID](state, newsCategoryId) {
    state.newsCategoryId = newsCategoryId;
  },
  [types.SET_MESCOUNT](state, mesCount) {
    state.mesCount = mesCount;
  }
};

export default mutations;
