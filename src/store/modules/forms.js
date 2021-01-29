import firebase from 'firebase';
import router from '../../router';

export default {
  state: {
    email: null,
    user: null,
    error: null,
    accountCreatedMessage: null,
  },

  getters: {
    getUser: (state) => {
      return state.user;
    },
    getError: (state) => {
      return state.error;
    },
    getCreatedMessage: (state) => {
      return state.accountCreatedMessage;
    },
  },

  mutations: {
    updateEmail(state, email) {
      state.email = email;
    },
    setUser(state, payload) {
      state.user = payload;
    },

    setError(state, payload) {
      state.error = payload;
    },
    resetError(state) {
      state.error = null;
    },
  },
  actions: {
    signUserUp({ commit, state }, payload) {
      commit('resetError', null);
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then((user) => {
          const newUser = {
            email: user.email,
            password: user.password,
          };
          commit('setUser', newUser);
          if (user) {
            state.accountCreatedMessage =
              'Your account was created, you can now sign in.';
            setTimeout(() => {
              router.push({ name: 'SignIn' });
              state.accountCreatedMessage = null;
            }, 3000);
          }
        })
        .catch((error) => {
          if (error) {
            commit('setError', error.message);
            commit('currentUser', firebase.auth().currentUser);
          }
        });
    },
    signUserIn({ commit }, payload) {
      commit('resetError', null);
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then((user) => {
          const newUser = {
            email: user.email,
            password: user.password,
          };
          commit('setUser', newUser);
          router.replace({ path: '/browse' });
        })
        .catch((error) => {
          commit('setError', error);
          console.log(error);
        });
    },
  },
};
