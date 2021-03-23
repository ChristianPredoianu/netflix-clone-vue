import firebase from 'firebase/app';
import 'firebase/auth';

export default {
  state: {
    currentUser: {
      email: null,
      id: null,
    },
  },

  getters: {
    getCurrentUser: (state) => state.currentUser,
  },

  mutations: {
    setCurrentUser(state) {
      const currUser = firebase.auth().currentUser;
      state.currentUser.email = currUser.email;
      state.currentUser.id = currUser.uid;
    },
    resetCurrentUser(state, payload) {
      state.currentUser.email = payload;
      state.currentUser.id = payload;
    },
  },

  actions: {
    setCurrentUser({ commit }) {
      commit('setCurrentUser');
    },
    resetCurrentUser({ commit }, payload) {
      commit('resetCurrentUser', payload);
    },
  },
};
