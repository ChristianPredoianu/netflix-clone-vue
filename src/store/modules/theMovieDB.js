import axios from 'axios';

export default {
  state: {
    //To mimic netflix movie content, only these movies will be avaliable throughout
    //the application.
    movieData: [
      {
        showcaseMovie: null,
        popular: null,
        action: null,
        comedy: null,
        crime: null,
        documentary: null,
        drama: null,
        horror: null,
        sciFi: null,
      },
    ],
    movieDetails: null,
  },

  getters: {
    getMovieData: (state) => {
      return state.movieData;
    },

    getMovieDetails: (state) => {
      return state.movieDetails;
    },
  },

  mutations: {
    setMovies(
      state,
      {
        showcase,
        popular,
        action,
        comedy,
        crime,
        documentary,
        drama,
        horror,
        sciFi,
      }
    ) {
      state.movieData[0].showcaseMovie = showcase;
      state.movieData[0].popular = popular;
      state.movieData[0].action = action;
      state.movieData[0].comedy = comedy;
      state.movieData[0].crime = crime;
      state.movieData[0].documentary = documentary;
      state.movieData[0].drama = drama;
      state.movieData[0].horror = horror;
      state.movieData[0].sciFi = sciFi;
    },

    setMovieDetails(state, payload) {
      state.movieDetails = payload;
    },
  },

  actions: {
    fetchMovieData({ commit, state }) {
      const apiUrl = 'https://api.themoviedb.org/3/';
      const apiKey = '05e21f7b2ffd8f1ad234881f857643ba';
      const genresUrl =
        'https://api.themoviedb.org/3/discover/movie?api_key=05e21f7b2ffd8f1ad234881f857643ba&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=';

      Promise.all([
        axios
          .get(
            `${apiUrl}find/tt4667888?api_key=${apiKey}&language=en-US&external_source=imdb_id`
          )
          .then((response) => response.data.tv_results[0]),
        axios
          .get(`${apiUrl}trending/movie/week?api_key=${apiKey}`)
          .then((response) => response.data.results),

        axios.get(`${genresUrl}28`).then((response) => response.data.results),
        axios.get(`${genresUrl}35`).then((response) => response.data.results),
        axios.get(`${genresUrl}80`).then((response) => response.data.results),
        axios.get(`${genresUrl}99`).then((response) => response.data.results),
        axios.get(`${genresUrl}18`).then((response) => response.data.results),
        axios.get(`${genresUrl}27`).then((response) => response.data.results),
        axios.get(`${genresUrl}878`).then((response) => response.data.results),
      ])

        .then(
          ([
            showcase,
            popular,
            action,
            comedy,
            crime,
            documentary,
            drama,
            horror,
            sciFi,
          ]) => {
            commit('setMovies', {
              showcase,
              popular,
              action,
              comedy,
              crime,
              documentary,
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
  },
};
