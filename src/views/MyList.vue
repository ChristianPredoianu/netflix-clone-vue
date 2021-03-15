!<template>
  <div class="my-list">
    <NavBar />
    <MovieModal v-if="isModalOpen" @closeModal="isModalOpen = false" />
    <MovieTrailerModal
      v-if="isMovieTrailerModalOpen"
      @closeModal="isMovieTrailerModalOpen = false"
    />

    <section class="movies-list">
      <h1 class="movies-list__heading">My List</h1>

      <div class="card-container">
        <div
          class="card"
          v-for="movie in getUserMoviesListFromDB"
          :key="movie.id"
        >
          <img :src="`https://image.tmdb.org/t/p/w300${movie.poster_path}`" />
          <div class="overlay">
            <img
              :src="`https://image.tmdb.org/t/p/w300${movie.poster_path}`"
              class="overlay__img"
            />
            <div class="icon-container">
              <div class="left">
                <font-awesome-icon
                  title="Play movie"
                  :icon="['far', 'play-circle']"
                  class="left__icon left__icon--play"
                  @click="playMovie(movie.id)"
                />
                <font-awesome-icon
                  title="Remove Movie"
                  :icon="['far', 'times-circle']"
                  class="left__icon left__icon--check"
                  @click="deleteMovie(movie)"
                />
              </div>
              <div class="right">
                <font-awesome-icon
                  title="Movie Details"
                  :icon="['fas', 'arrow-circle-down']"
                  class="right__icon right__icon--arrow"
                  @click="openMovieDetailsModal(movie)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import NavBar from '../components/layout/nav/Navbar';
import MovieModal from '../components/ui/MovieModal';
import MovieTrailerModal from '../components/ui/MovieTrailerModal';
import deleteMovieFromUserList from '../mixins/deleteMovieFromUserList';
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';

export default {
  mixins: [deleteMovieFromUserList],
  components: {
    NavBar,
    MovieModal,
    MovieTrailerModal,
  },

  data() {
    return {
      isModalOpen: false,
      isMovieTrailerModalOpen: false,
    };
  },

  methods: {
    playMovie(movieId) {
      this.isMovieTrailerModalOpen = true;
      this.fetchMovieTrailer(movieId);
    },

    openMovieDetailsModal(selectedMovie) {
      console.log(selectedMovie.id);
      this.isModalOpen = true;
      this.fetchMovieDetails(selectedMovie.id);
    },
    ...mapActions([
      'setUserMoviesListFromDB',
      'fetchMovieDetails',
      'fetchMovieTrailer',
    ]),
  },
  computed: {
    ...mapGetters([
      'getUserMoviesListFromDB',
      'getCurrentUser',
      'getTheClickedProfile',
    ]),
  },
  created() {
    this.setUserMoviesListFromDB();
  },
};
</script>

<style lang="scss" scoped>
@import '../sass/views/_my-list.scss';
</style>
