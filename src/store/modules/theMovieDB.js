import axios from 'axios';

export default {
  state: {
    //To mimic netflix movie content, only these movies will be avaliable throughout
    //the application.
    movieData: [
      {
        popular: [],
        action: [],
        comedy: [],
        crime: [],
        animation: [],
        drama: [],
        horror: [],
        sciFi: [],
      },
    ],
    movieDetails: [],
    movieTrailer: [],
  },

  getters: {
    getMovieData: (state) => state.movieData,
    getMovieDetails: (state) => state.movieDetails,
    getMovieTrailer: (state) => state.movieTrailer,
  },

  mutations: {
    setMovies(
      state,
      { popular, action, comedy, crime, animation, drama, horror, sciFi }
    ) {
      state.movieData[0].popular = popular;
      state.movieData[0].action = action;
      state.movieData[0].comedy = comedy;
      state.movieData[0].crime = crime;
      state.movieData[0].animation = animation;
      state.movieData[0].drama = drama;
      state.movieData[0].horror = horror;
      state.movieData[0].sciFi = sciFi;
    },

    setMovieDetails(state, payload) {
      state.movieDetails = payload;
    },
    setMovieTrailer(state, payload) {
      state.movieTrailer = payload;
    },
  },

  actions: {
    fetchMovieData({ commit }) {
      const apiUrl = 'https://api.themoviedb.org/3/';
      const apiKey = process.env.VUE_APP_API_KEY;
      const genresUrl =
        'https://api.themoviedb.org/3/discover/movie?api_key=05e21f7b2ffd8f1ad234881f857643ba&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=';

      Promise.all([
        axios
          .get(`${apiUrl}trending/movie/week?api_key=${apiKey}`)
          .then((response) => response.data.results),

        axios.get(`${genresUrl}28`).then((response) => response.data.results),
        axios.get(`${genresUrl}35`).then((response) => response.data.results),
        axios.get(`${genresUrl}80`).then((response) => response.data.results),
        axios.get(`${genresUrl}16`).then((response) => response.data.results),
        axios.get(`${genresUrl}18`).then((response) => response.data.results),
        axios.get(`${genresUrl}27`).then((response) => response.data.results),
        axios.get(`${genresUrl}878`).then((response) => response.data.results),
      ])

        .then(
          ([
            popular,
            action,
            comedy,
            crime,
            animation,
            drama,
            horror,
            sciFi,
          ]) => {
            commit('setMovies', {
              popular,
              action,
              comedy,
              crime,
              animation,
              drama,
              horror,
              sciFi,
            });
          }
        )
        .catch((error) => {
          console.log(error);
        });
    },

    fetchMovieDetails({ commit }, payload) {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${payload}?api_key=05e21f7b2ffd8f1ad234881f857643ba&language=en-US`
        )
        .then((response) => commit('setMovieDetails', response.data))
        .catch((error) => {
          console.log(error);
        });
    },

    fetchMovieTrailer({ commit }, payload) {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${payload}/videos?api_key=05e21f7b2ffd8f1ad234881f857643ba&language=en-US`
        )
        .then((response) => commit('setMovieTrailer', response.data))
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
