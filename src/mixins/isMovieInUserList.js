export default {
  methods: {
    isMovieInUserList(movie) {
      const isMovieInList = this.getUserMoviesListFromDB.find(
        (mov) => mov.id === movie.id
      );
      if (isMovieInList) return true;
    },
  },
};
