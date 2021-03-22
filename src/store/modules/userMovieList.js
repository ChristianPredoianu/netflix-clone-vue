import firebase from 'firebase/app';
import 'firebase/database';
import { checkIfElementIsInArray } from './shared-functions/sharedFunctions';

export default {
  state: {
    userMoviesList: null,
  },

  getters: {
    getUserMoviesListFromDB: (state) => state.userMoviesList,
  },

  mutations: {
    setUserMoviesListFromDB(state, payload) {
      state.userMoviesList = payload;
    },
  },

  actions: {
    setUserMoviesListFromDB({ commit, getters }) {
      const moviesListArray = [];
      firebase
        .database()
        .ref(`users/${getters.getCurrentUser.id}`)
        .child(`profiles/${getters.getTheClickedProfile.id}/moviesList`)
        .on('value', (snapshot) => {
          snapshot.forEach((childSnapshot) => {
            const childData = childSnapshot.val();
            const id = childData.id;

            checkIfElementIsInArray(moviesListArray, id, childData);
          });
        });
      commit('setUserMoviesListFromDB', moviesListArray);
    },
  },
};
