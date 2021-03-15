import firebase from 'firebase';

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
    setCreatedMessage(state, payload) {
      state.accountCreatedMessage = payload;
    },
    resetError(state) {
      state.error = null;
    },
  },

  actions: {
    async signUserUp({ commit }, payload) {
      commit('resetError', null);
      await firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then((user) => {
          const newUser = {
            email: user.user.email,
          };
          console.log(newUser);
          commit('setUser', newUser);
        })
        .catch((error) => {
          if (error) {
            commit('setError', error.message);
          }
        });
    },
    async signUserIn({ commit }, payload) {
      commit('resetError', null);
      await firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then((user) => {
          const newUser = {
            email: user.user.email,
          };
          commit('setUser', newUser);
        })
        .catch((error) => {
          commit('setError', error.message);
        });
    },
    setUser({ commit }, payload) {
      commit('setUser', payload);
    },
  },
};
