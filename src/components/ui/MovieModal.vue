<template>
  <div>
    <div class="overlay" @click.self="closeModal">
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
            <button class="modal-cta__btn">
              <font-awesome-icon
                :icon="['fas', 'play']"
                class="modal-cta__play-icon"
              />Play
            </button>
            <font-awesome-icon
              :icon="['far', 'times-circle']"
              class="modal-cta__remove"
            />
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
import { mapGetters } from 'vuex';
export default {
  methods: {
    closeModal() {
      this.$emit('closeModal');
    },
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
