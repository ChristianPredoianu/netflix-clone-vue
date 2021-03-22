!<template>
  <div>
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
          <Movie
            v-for="movie in getUserMoviesListFromDB"
            :key="movie.id"
            :movie="movie"
          />
        </div>
      </section>
    </div>
    <Footer />
  </div>
</template>

<script>
import NavBar from '@/components/layout/nav/Navbar';
import Movie from '@/components/movie/Movie';
import MovieModal from '@/components/movie-modals/MovieModal';
import MovieTrailerModal from '@/components/movie-modals/MovieTrailerModal';
import deleteMovieFromUserList from '@/mixins/deleteMovieFromUserList';
import Footer from '@/components/layout/Footer';
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';

export default {
  mixins: [deleteMovieFromUserList],
  components: {
    NavBar,
    Movie,
    MovieModal,
    MovieTrailerModal,
    Footer,
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
@import '@/sass/views/_my-list.scss';
</style>
