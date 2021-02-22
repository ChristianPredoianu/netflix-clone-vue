<template>
  <div>
    <div class="overlay" @click.self="closeModal()">
      <div class="modal">
        <div class="modal-preview">
          <img
            :src="
              `${
                movieDetails.backdrop_path
                  ? 'https://image.tmdb.org/t/p/w500'
                  : 'https://image.tmdb.org/t/p/w500'
              }${
                movieDetails.backdrop_path
                  ? movieDetails.backdrop_path
                  : movieDetails.poster_path
              }`
            "
            alt="movie preview poster"
            class="modal-preview__img"
          />
        </div>
        <div class="modal-info"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    movieDetails: {
      type: Object,
    },
  },
  methods: {
    closeModal() {
      this.$emit('closeModal');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../sass/components/ui/_movie-modal.scss';
</style>
