import firebase from 'firebase/app';
import 'firebase/database';
import { checkIfElementIsInArray } from './shared-functions/sharedFunctions';

export default {
  state: {
    userProfiles: [],
    clickedProfile: null,
    userMoviesList: null,
  },

  getters: {
    getUserProfiles: (state) => state.userProfiles,
    getTheClickedProfile: (state) => state.clickedProfile,
  },

  mutations: {
    setUserProfilesFromDB(state, data) {
      state.userProfiles = data;
    },
    setClickedProfile(state, payload) {
      state.clickedProfile = payload;
    },
  },

  actions: {
    setUserProfilesFromDB({ commit, getters }) {
      const profilesArray = [];
      firebase
        .database()
        .ref(`users/${getters.getCurrentUser.id}`)
        .child('profiles')
        .on('value', (snapshot) => {
          snapshot.forEach((childSnapshot) => {
            const childData = childSnapshot.val();
            const id = childSnapshot.key;
            childData.id = id;

            checkIfElementIsInArray(profilesArray, id, childData);
          });
        });

      commit('setUserProfilesFromDB', profilesArray);
    },

    setClickedProfile({ commit }, payload) {
      commit('setClickedProfile', payload);
    },
  },
};
