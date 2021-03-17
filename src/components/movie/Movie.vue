<template>
  <div class="wrapper">
    <MovieModal v-if="isModalOpen" @closeModal="isModalOpen = false" />
    <MovieTrailerModal
      v-if="isMovieTrailerModalOpen"
      @closeModal="isMovieTrailerModalOpen = false"
    />
    <div class="card">
      <img
        :src="`https://image.tmdb.org/t/p/w300${movie.poster_path}`"
        class="card__img"
      />
      <div class="overlay">
        <div class="icon-container">
          <div class="left">
            <font-awesome-icon
              title="Play movie"
              :icon="['far', 'play-circle']"
              class="left__icon left__icon--play"
              @click="playMovie(movie)"
            />

            <font-awesome-icon
              :icon="['fas', 'plus-circle']"
              class="left__icon left__icon--check"
              @click="addToMovieList(movie)"
              v-if="!isMovieInUserList(movie)"
            />

            <font-awesome-icon
              title="Remove Movie"
              :icon="['fas', 'times-circle']"
              class="left__icon left__icon--check"
              @click="deleteMovie(movie)"
              v-else
            />
          </div>
          <div class="right">
            <font-awesome-icon
              title="Movie Details"
              :icon="['fas', 'info-circle']"
              class="right__icon right__icon--arrow"
              @click="openMovieDetailsModal(movie)"
            />
          </div>
        </div>
        <div class="info-container">
          <p class="info-container__movie-title">{{ movie.title }}</p>
          <p>
            Release:
            {{ movie.release_date ? movie.release_date : movie.first_air_date }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MovieModal from '@/components/movie-modals/MovieModal';
import MovieTrailerModal from '@/components/movie-modals/MovieTrailerModal';
import isMovieInUserList from '@/mixins/isMovieInUserList';
import addMovieToUserList from '@/mixins/addMovieToUserList';
import deleteMovieFromUserList from '@/mixins/deleteMovieFromUserList';
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';

export default {
  mixins: [isMovieInUserList, addMovieToUserList, deleteMovieFromUserList],

  components: {
    MovieModal,
    MovieTrailerModal,
  },

  props: {
    movie: {
      type: [Object],
      required: true,
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
@import '@/sass/components/movie/_movie.scss';
@import '@/sass/components/_overlay.scss';
</style>
