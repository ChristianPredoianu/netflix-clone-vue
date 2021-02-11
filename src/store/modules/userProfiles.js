import firebase from 'firebase';

export default {
  state: {
    userProfiles: [],
    clickedProfile: null,
  },
  getters: {
    getUserProfiles: (state) => {
      return state.userProfiles;
    },
    getTheClickedProfile: (state) => {
      return state.clickedProfile;
    },
  },

  mutations: {
    setUserProfiles(state, data) {
      state.userProfiles = data;
    },
    setClickedProfile(state, payload) {
      state.clickedProfile = payload;
    },
  },
  actions: {
    setUserProfilesFromDB({ commit, getters }) {
      firebase
        .database()
        .ref(`users/${getters.getCurrentUser.id}`)
        .on('value', (snapshot) => {
          const profilesArray = [];
          snapshot.forEach((childSnapshot) => {
            const childData = childSnapshot.val();
            const id = childSnapshot.key;
            childData.id = id;
            profilesArray.push(childData);
          });
          commit('setUserProfiles', profilesArray);
        });
    },
    setClickedProfile({ commit }, payload) {
      commit('setClickedProfile', payload);
    },
  },
};
