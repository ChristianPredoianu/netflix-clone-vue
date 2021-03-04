<template>
  <keep-alive include="browse">
    <div>
      <section class="showcase">
        <NavBar class="nav" />
        <div class="movie-container">
          <h1 class="movie-container__heading">
            {{ getMovieData[0].showcaseMovie.name }}
          </h1>
          <p class="movie-container__paragraph">
            {{ getMovieData[0].showcaseMovie.overview }}
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
          <video class="video" ref="video" muted @ended="isVideoPaused">
            <source
              src="../assets/videos/pexels-vlado-pitbullgrif-6650121.mp4"
              type="video/mp4"
            />
          </video>
          <div class="overlay"></div>
        </div>
      </section>

      <section class="sliders-section">
        <div class="slider-container">
          <h2 class="slider-container__my-list">My list</h2>
          <button @click="signout">signout</button>
          <UserMovieList :userMovieList="getUserMoviesListFromDB" />
          <h2 class="slider-container__my-list">Popular on Netflix</h2>
          <MovieSlider
            :category="getMovieData[0].popular"
            :currentUser="getCurrentUser"
            :clickedProfile="getTheClickedProfile"
          />
          <h2 class="slider-container__my-list">Comedy Movies</h2>
          <MovieSlider
            :category="getMovieData[0].comedy"
            :currentUser="getCurrentUser"
            :clickedProfile="getTheClickedProfile"
          />
          <h2 class="slider-container__my-list">Crime Movies</h2>
          <MovieSlider
            :category="getMovieData[0].crime"
            :currentUser="getCurrentUser"
            :clickedProfile="getTheClickedProfile"
          />
          <h2 class="slider-container__my-list">Action Movies</h2>
          <MovieSlider
            :category="getMovieData[0].action"
            :currentUser="getCurrentUser"
            :clickedProfile="getTheClickedProfile"
          />
          <h2 class="slider-container__my-list">Documentary Movies</h2>
          <MovieSlider
            :category="getMovieData[0].documentary"
            :currentUser="getCurrentUser"
            :clickedProfile="getTheClickedProfile"
          />
          <h2 class="slider-container__my-list">Drama Movies</h2>
          <MovieSlider
            :category="getMovieData[0].drama"
            :currentUser="getCurrentUser"
            :clickedProfile="getTheClickedProfile"
          />
          <h2 class="slider-container__my-list">Horror Movies</h2>
          <MovieSlider
            :category="getMovieData[0].horror"
            :currentUser="getCurrentUser"
            :clickedProfile="getTheClickedProfile"
          />
          <h2 class="slider-container__my-list">SciFi Movies</h2>
          <MovieSlider
            :category="getMovieData[0].sciFi"
            :currentUser="getCurrentUser"
            :clickedProfile="getTheClickedProfile"
          />
        </div>
      </section>
    </div>
  </keep-alive>
</template>

<script>
import firebase from 'firebase';
import NavBar from '../components/layout/nav/Navbar';
import UserMovieList from '../components/movie-sliders/UserMovieList';
import MovieSlider from '../components/movie-sliders/MovieSlider';
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';
export default {
  name: 'Browse',
  data() {
    return {
      isMuted: true,
      isPlaying: true,
    };
  },
  components: {
    NavBar,
    UserMovieList,
    MovieSlider,
  },
  methods: {
    signout() {
      firebase.auth().signOut;
    },
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
    ...mapActions(['fetchMovieData', 'setUserMoviesListFromDB']),
  },
  computed: {
    videoElement() {
      return this.$refs.video;
    },
    ...mapGetters([
      'getMovieData',
      'getTheClickedProfile',
      'getCurrentUser',
      'getUserMoviesListFromDB',
    ]),
  },
  created() {
    //Since Promise.all waits for all promises to resolve in our action
    //we can just check to see if one of the array is not empty for lazy loading
    //If any of the given promises rejects, it still becomes the error of Promise.all,
    //and all other results are ignored.
    /*  if (this.getMovieData[0].showcaseMovie.length === 0) */ this.fetchMovieData();
    this.setUserMoviesListFromDB();
  },
};
</script>

<style lang="scss" scoped>
@import '../sass/views/_browse.scss';
</style>
