import * as types from './mutations-types';

export const getNewsCategoryId = function ({commit}, {newsCategoryId}) {
  commit(types.SET_NEWSCATEGORYID, newsCategoryId);
};
