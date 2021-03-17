import firebase from 'firebase/app';
import 'firebase/database';

export default {
  methods: {
    deleteMovie(movie) {
      const movieToDeleteFromList = this.getUserMoviesListFromDB.find(
        (mov) => mov.id === movie.id
      );

      if (movieToDeleteFromList !== undefined) {
        const databaseRef = `users/${this.getCurrentUser.id}`;
        const child = `profiles/${this.getTheClickedProfile.id}/moviesList`;
        firebase
          .database()
          .ref(databaseRef)
          .child(child)
          .orderByChild('id')
          .equalTo(movieToDeleteFromList.id)
          .once('child_added', (snapshot) => {
            snapshot.ref.remove();
          });
        this.setUserMoviesListFromDB();
      }
    },
  },
};
