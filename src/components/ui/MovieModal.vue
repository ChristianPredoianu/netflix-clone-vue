<template>
  <div>
    <MovieTrailerModal
      v-if="isMovieTrailerModalOpen"
      @closeModal="isMovieTrailerModalOpen = false"
    />
    <div
      class="overlay"
      v-if="!isMovieTrailerModalOpen"
      @click.self="closeModal"
    >
      <div class="modal">
        <div class="modal-preview">
          <font-awesome-icon
            :icon="['fas', 'times']"
            class="modal-preview__close"
            @click="closeModal"
          />
          <img
            :src="
              `https://image.tmdb.org/t/p/w1280${
                getMovieDetails.backdrop_path
                  ? getMovieDetails.backdrop_path
                  : getMovieDetails.poster_path
              }`
            "
            alt="movie preview poster"
            class="modal-preview__img"
          />
          <h1 class="modal-preview__movie-title">
            {{ getMovieDetails.original_title }}
          </h1>
          <div class="modal-cta">
            <button
              class="modal-cta__btn"
              @click="playMovie(getMovieDetails.id)"
            >
              <font-awesome-icon
                :icon="['fas', 'play']"
                class="modal-cta__play-icon"
              />Play
            </button>
          </div>
        </div>
        <div class="modal-info">
          <div class="info-col-left">
            <p class="info-col-left__release-year">
              {{ releaseDateToFullYear }}
            </p>
            <p class="info-col-left__overview">
              {{ getMovieDetails.overview }}
            </p>
          </div>
          <div class="info-col-right">
            <p class="info-col-right__desc">Genres:</p>
            <p
              class="info-col-right__paragraph"
              v-for="genre in getMovieDetails.genres"
              :key="genre.name"
            >
              {{ genre.name }}
            </p>
            <p class="info-col-right__desc">Language:</p>
            <p class="info-col-right__paragraph">
              {{ getMovieDetails.original_language }}
            </p>
            <p class="info-col-right__desc">Vote average:</p>
            <p class="info-col-right__paragraph">
              {{ getMovieDetails.vote_average }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MovieTrailerModal from '../ui/MovieTrailerModal';
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';
export default {
  components: {
    MovieTrailerModal,
  },

  data() {
    return {
      isMovieTrailerModalOpen: false,
    };
  },

  methods: {
    playMovie(movieId) {
      this.isMovieTrailerModalOpen = true;
      this.fetchMovieTrailer(movieId);
    },
    closeModal() {
      this.$emit('closeModal');
    },

    ...mapActions(['fetchMovieTrailer']),
  },

  computed: {
    releaseDateToFullYear() {
      const dateObj = new Date(this.getMovieDetails.release_date);
      const year = dateObj.getUTCFullYear();
      return year;
    },

    ...mapGetters(['getMovieDetails']),
  },
};
</script>

<style lang="scss" scoped>
@import '../../sass/components/ui/_movie-modal.scss';
</style>
