export default {
  state: {
    email: null,
  },
  getters: {
    getEmail: (state) => state.email,
  },
  mutations: {
    updateMessage(state, value) {
      state.email = value;
    },
  },
  actions: {},
};
