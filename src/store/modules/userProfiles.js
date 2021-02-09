import firebase from 'firebase';

export default {
  state: {
    userProfiles: [],
  },
  getters: {
    getUserProfiles: (state) => {
      return state.userProfiles;
    },
  },

  mutations: {
    setUserProfiles(state, data) {
      state.userProfiles = data;
    },
  },
  actions: {
    getUserProfilesFromDB({ commit, getters }) {
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
  },
};
