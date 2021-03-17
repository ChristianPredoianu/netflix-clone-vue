import firebase from 'firebase/app';
import 'firebase/database';

export default {
  methods: {
    addToMovieList(movie) {
      const databaseRef = `users/${this.getCurrentUser.id}`;
      const child = `profiles/${this.getTheClickedProfile.id}/moviesList`;

      firebase
        .database()
        .ref(databaseRef)
        .child(child)
        .orderByChild('id')
        .equalTo(movie.id)
        .once('value', (snapshot) => {
          if (!snapshot.exists()) {
            firebase
              .database()
              .ref(databaseRef)
              .child(child)
              .push(movie);
          }
        });
      this.setUserMoviesListFromDB();
    },
  },
};
