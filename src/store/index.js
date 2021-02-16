import Vue from 'vue';
import Vuex from 'vuex';
import forms from './modules/forms';
import userData from './modules/userData';
import userProfiles from './modules/userProfiles';
import theMovieDB from './modules/theMovieDB';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    forms,
    userData,
    userProfiles,
    theMovieDB,
  },
  plugins: [createPersistedState()],
});
