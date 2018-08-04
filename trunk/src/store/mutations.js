import * as types from './mutations-types';

const mutations = {
  [types.SET_TABS](state, tabs) {
    state.tabs = tabs;
  }
};

export default mutations;
