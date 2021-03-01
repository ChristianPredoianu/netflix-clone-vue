import firebase from 'firebase';

function checkIfElementIsInArray(array, id, childData) {
  const index = array.findIndex((x) => x.id === id);
  if (index === -1) array.push(childData);
}

export default {
  state: {
    userProfiles: [],
    clickedProfile: null,
    userMoviesList: null,
  },

  getters: {
    getUserProfiles: (state) => {
      return state.userProfiles;
    },
    getTheClickedProfile: (state) => {
      return state.clickedProfile;
    },
    getUserMoviesListFromDB: (state) => {
      return state.userMoviesList;
    },
  },

  mutations: {
    setUserProfilesFromDB(state, data) {
      state.userProfiles = data;
    },
    setClickedProfile(state, payload) {
      state.clickedProfile = payload;
    },
    setUserMoviesListFromDB(state, payload) {
      state.userMoviesList = payload;
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

            /*    const index = profilesArray.findIndex((x) => x.id === id);
            index === -1
              ? profilesArray.push(childData)
              : console.log('it is already there'); */
          });
        });

      commit('setUserProfilesFromDB', profilesArray);
    },

    setClickedProfile({ commit }, payload) {
      commit('setClickedProfile', payload);
    },

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

            /*   const index = moviesListArray.findIndex(
              (x) => x.id === childData.id
            );
            index === -1
              ? moviesListArray.push(childData)
              : console.log('it is already there');
            console.log(childData); */
          });
        });
      commit('setUserMoviesListFromDB', moviesListArray);
    },
  },
};
