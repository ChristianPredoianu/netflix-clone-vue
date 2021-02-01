import Vue from 'vue';
import Vuex from 'vuex';
import forms from './modules/forms';
import userData from './modules/userData';
import theMovieDB from './modules/theMovieDB';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    forms,
    userData,
    theMovieDB,
  },
});
