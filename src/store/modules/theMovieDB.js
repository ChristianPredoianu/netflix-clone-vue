import axios from 'axios';

export default {
  state: {
    movieData: [],
  },
  getters: {
    getMovieData: (state) => {
      return state.movieData;
    },
  },
  mutations: {
    setMovieData(state, data) {
      state.movieData = data;
    },
  },
  actions: {
    fetchMovieData({ commit, state }) {
      axios
        .get(
          'https://api.themoviedb.org/3/movie/651571/videos?api_key=05e21f7b2ffd8f1ad234881f857643ba&language=en-US'
        )
        .then((data) => {
          commit('setMovieData', data.data);
          console.log(state.movieData);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
