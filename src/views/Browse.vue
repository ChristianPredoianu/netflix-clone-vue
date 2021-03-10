<template>
  <div>
    <section class="showcase">
      <NavBar class="nav" @search="setSearchTerm" />
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
          />
          Play
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
        <video class="video" ref="video" muted autoplay @ended="isVideoPaused">
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
        <!-- User List -->
        <h2
          class="slider-container__my-list"
          v-if="getUserMoviesListFromDB.length !== 0"
        >
          My list
        </h2>
        <UserMovieList :userMovieList="getUserMoviesListFromDB" />

        <!-- Popular Movies -->
        <h2
          class="slider-container__my-list"
          v-if="
            searchMovie('popular') === undefined ||
              searchMovie('popular').length === 0
          "
        >
          Popular Movies
        </h2>
        <h2 class="slider-container__my-list" v-else>
          {{ `${searchMovie('popular').length} Movies found in popular` }}
        </h2>
        <MovieSlider
          :category="
            !searchTerm ? getMovieData[0].popular : searchMovie('popular')
          "
        />

        <!-- Comedy Movies -->
        <h2
          class="slider-container__my-list"
          v-if="
            searchMovie('comedy') === undefined ||
              searchMovie('popular').length === 0
          "
        >
          Comedy Movies
        </h2>
        <h2 class="slider-container__my-list" v-else>
          {{ `${searchMovie('comedy').length} Movies found in Comedy` }}
        </h2>
        <MovieSlider
          :category="
            !searchTerm ? getMovieData[0].comedy : searchMovie('comedy')
          "
        />

        <!-- Crime Movies -->
        <h2
          class="slider-container__my-list"
          v-if="
            searchMovie('crime') === undefined ||
              searchMovie('popular').length === 0
          "
        >
          Crime Movies
        </h2>
        <h2 class="slider-container__my-list" v-else>
          {{ `${searchMovie('crime').length} Movies found in Crime` }}
        </h2>
        <MovieSlider
          :category="!searchTerm ? getMovieData[0].crime : searchMovie('crime')"
        />

        <!-- Action Movies -->
        <h2
          class="slider-container__my-list"
          v-if="
            searchMovie('action') === undefined ||
              searchMovie('popular').length === 0
          "
        >
          Action Movies
        </h2>
        <h2 class="slider-container__my-list" v-else>
          {{ `${searchMovie('action').length} Movies found in Action` }}
        </h2>
        <MovieSlider
          :category="
            !searchTerm ? getMovieData[0].action : searchMovie('action')
          "
        />

        <!-- Animated Movies -->
        <h2
          class="slider-container__my-list"
          v-if="
            searchMovie('animation') === undefined ||
              searchMovie('popular').length === 0
          "
        >
          Animated Movies
        </h2>
        <h2 class="slider-container__my-list" v-else>
          {{ `${searchMovie('animation').length} Movies found in Animated` }}
        </h2>
        <MovieSlider
          :category="
            !searchTerm ? getMovieData[0].animation : searchMovie('animation')
          "
        />

        <!-- Drama Movies -->
        <h2
          class="slider-container__my-list"
          v-if="
            searchMovie('drama') === undefined ||
              searchMovie('popular').length === 0
          "
        >
          Drama Movies
        </h2>
        <h2 class="slider-container__my-list" v-else>
          {{ `${searchMovie('drama').length} Movies found in Drama` }}
        </h2>
        <MovieSlider
          :category="!searchTerm ? getMovieData[0].drama : searchMovie('drama')"
        />

        <!-- Horror Movies -->
        <h2
          class="slider-container__my-list"
          v-if="
            searchMovie('horror') === undefined ||
              searchMovie('popular').length === 0
          "
        >
          Horror Movies
        </h2>
        <h2 class="slider-container__my-list" v-else>
          {{ `${searchMovie('horror').length} Movies found in Horror` }}
        </h2>
        <MovieSlider
          :category="
            !searchTerm ? getMovieData[0].horror : searchMovie('horror')
          "
        />

        <!-- SciFI Movies -->
        <h2
          class="slider-container__my-list"
          v-if="
            searchMovie('sciFi') === undefined ||
              searchMovie('popular').length === 0
          "
        >
          SciFi Movies
        </h2>
        <h2 class="slider-container__my-list" v-else>
          {{ `${searchMovie('sciFi').length} Movies found in SciFi` }}
        </h2>
        <MovieSlider
          :category="!searchTerm ? getMovieData[0].sciFi : searchMovie('sciFi')"
        />
      </div>
    </section>
  </div>
</template>

<script>
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
      searchTerm: '',
    };
  },
  components: {
    NavBar,
    UserMovieList,
    MovieSlider,
  },
  methods: {
    searchMovie(category) {
      let found;
      if (this.searchTerm !== '' && category !== undefined) {
        found = this.getMovieData[0][category].filter((element) =>
          element.original_title.includes(
            this.searchTerm
              .toLowerCase()
              .split(' ')
              .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
              .join(' ')
          )
        );
      }

      return found;
    },
    setSearchTerm(value) {
      this.searchTerm = value;
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
    ...mapGetters(['getMovieData', 'getUserMoviesListFromDB']),
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
