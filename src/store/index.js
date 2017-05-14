/**
 * Created by 鑫 on 2017/5/13.
 */

import Vuex from 'vuex';
import Vue from 'vue';
import data from '../../data.json';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    qIndex: 0,
    questionList: data.list
  },
  mutations: {
    nextEvent: state => state.qIndex++,
    preEvent: state => state.qIndex--,
    errInEvent: (state, num) => {
      state.qIndex = num;
    },
    collectInEvent: (state, num) => {
      state.qIndex = num;
    },
    allQuestionEvent: (state, num) => {
      state.qIndex = num;
    }
  },
  getters: {
    thisQuestion: state => data.list[state.qIndex]
  }
});
