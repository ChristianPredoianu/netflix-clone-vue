<template>
  <div>
    <section class="showcase">
      <NavBar class="nav" />
      <div class="movie-container">
        <h1 class="movie-container__heading">Slasher</h1>
        <p class="movie-container__paragraph">
          Visions about Dantes inferno. Ledtrådar i en bottocsdo målning. Ett
          virus som bara han kan stoppa, om han löser gåtan
        </p>
        <button class="movie-container__btn">
          <font-awesome-icon
            :icon="['fas', 'play']"
            class="video-controls__icon video-controls__icon--play"
          />Play
        </button>
        <button class="movie-container__btn movie-container__btn--info ">
          <font-awesome-icon
            :icon="['fas', 'info-circle']"
            class="video-controls__icon video-controls__icon--info"
          />
          More info
        </button>
      </div>
      <!-- Video controls -->
      <div class="video-controls">
        <font-awesome-icon
          :icon="['fas', 'volume-mute']"
          class="video-controls__icon"
          @click="playSound"
          v-if="isMuted"
        />

        <font-awesome-icon
          :icon="['fas', 'volume-up']"
          class="video-controls__icon"
          @click="muteVideo"
          v-if="!isMuted"
        />

        <transition name="fade">
          <font-awesome-icon
            :icon="['fa', 'history']"
            class="video-controls__icon"
            @click="replayVideo"
            v-if="!isPlaying"
        /></transition>
        <div class="video-controls__rec-age">13+</div>
      </div>
      <div class="video-container">
        <video
          class="video"
          ref="video"
          poster="poster.JPG"
          autoplay
          @ended="isVideoPaused"
        >
          <source
            src="../assets/videos/pexels-vlado-pitbullgrif-6650121.mp4"
            type="video/mp4"
          />
        </video>
        <div class="overlay"></div>
      </div>
    </section>
  </div>
</template>

<script>
import NavBar from '../components/layout/nav/Navbar';
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      isMuted: false,
      isPlaying: true,
    };
  },
  components: {
    NavBar,
  },

  methods: {
    muteVideo() {
      this.videoElement.muted = true;
      this.isMuted = true;
    },
    playSound() {
      this.videoElement.muted = false;
      this.isMuted = false;
    },
    isVideoPaused() {
      this.isPlaying = false;
    },
    replayVideo() {
      this.isPlaying = true;
      this.videoElement.play();
    },
    ...mapActions(['fetchMovieData']),
  },
  computed: {
    videoElement() {
      return this.$refs.video;
    },
    ...mapGetters(['getMovieData']),
  },
  created() {
    this.fetchMovieData();
  },
};
</script>

<style lang="scss" scoped>
@import '../sass/views/_browse.scss';
</style>
