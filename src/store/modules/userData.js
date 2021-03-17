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
    getCurrentUser: (state) => {
      return state.currentUser;
    },
  },
  mutations: {
    setCurrentUser(state) {
      const currUser = firebase.auth().currentUser;
      state.currentUser.email = currUser.email;
      state.currentUser.id = currUser.uid;
    },
  },
  actions: {
    setCurrentUser({ commit }) {
      commit('setCurrentUser');
    },
  },
};
