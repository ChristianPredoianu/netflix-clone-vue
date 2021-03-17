<template>
  <div>
    <div class="overlay" @click.self="closeModal">
      <div class="modal">
        <div class="yt-player-container">
          <font-awesome-icon
            :icon="['fas', 'times']"
            class="yt-player-container__close"
            @click="closeModal"
          />
          <iframe
            class="yt-player-container__yt-player"
            type="text/html"
            :src="
              `https://www.youtube.com/embed/${this.getMovieTrailer.results[0].key}?autoplay=1&mute=1`
            "
            frameborder="0"
            allowFullScreen="true"
          ></iframe>
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
    ...mapGetters(['getMovieTrailer']),
  },
};
</script>

<style lang="scss" scoped>
@import '../../sass/components/ui/_movie-trailer-modal.scss';
</style>
