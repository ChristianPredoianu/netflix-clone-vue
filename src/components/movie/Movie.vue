<template>
  <div class="wrapper">
    <MovieModal v-if="isModalOpen" @closeModal="isModalOpen = false" />
    <MovieTrailerModal
      v-if="isMovieTrailerModalOpen"
      @closeModal="isMovieTrailerModalOpen = false"
    />
    <div
      class="card"
      v-for="movie in category"
      :key="movie.id"
      @click="openMovieDetailsModal(movie)"
    >
      <img
        :src="`https://image.tmdb.org/t/p/w300${movie.poster_path}`"
        class="card__img"
      />
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
              @click="playMovie(movie)"
            />

            <font-awesome-icon
              :icon="['far', 'check-circle']"
              class="left__icon left__icon--check"
              @click="addToMovieList(movie)"
              v-if="!isMovieInUserList(movie)"
            />

            <font-awesome-icon
              title="Remove Movie"
              :icon="['far', 'times-circle']"
              class="left__icon left__icon--check"
              @click="deleteMovie(movie)"
              v-else
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
</template>

<script>
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';
import MovieModal from '../ui/MovieModal';
import isMovieInUserList from '../../mixins/isMovieInUserList';
import addMovieToUserList from '../../mixins/addMovieToUserList';
import deleteMovieFromUserList from '../../mixins/deleteMovieFromUserList';
import MovieTrailerModal from '../ui/MovieTrailerModal';

export default {
  mixins: [isMovieInUserList, addMovieToUserList, deleteMovieFromUserList],

  components: {
    MovieModal,
    MovieTrailerModal,
  },

  props: {
    category: {
      type: [Array, Function],
    },
  },

  data() {
    return {
      isModalOpen: false,
      isMovieTrailerModalOpen: false,
    };
  },

  methods: {
    playMovie(selectedMovie) {
      this.isMovieTrailerModalOpen = true;
      this.fetchMovieTrailer(selectedMovie.id);
    },
    openMovieDetailsModal(selectedMovie) {
      this.isModalOpen = true;
      this.$store.dispatch('fetchMovieDetails', selectedMovie.id);
    },
    ...mapActions(['setUserMoviesListFromDB', 'fetchMovieTrailer']),
  },

  computed: {
    ...mapGetters([
      'getUserMoviesListFromDB',
      'getCurrentUser',
      'getTheClickedProfile',
    ]),
  },
};
</script>

<style lang="scss" scoped>
@import '../../sass/views/_movies.scss';
</style>
