<template>
  <div v-if="$store.state.movieData !== null">
    <MovieTrailerModal
      v-if="isMovieTrailerModalOpen"
      @closeModal="isMovieTrailerModalOpen = false"
    />
    <MovieModal
      v-if="isMovieModalOpen"
      @closeModal="isMovieModalOpen = false"
    />
    <section class="showcase">
      <NavBar class="nav" @search="setSearchTerm" />
      <div class="movie-container">
        <h1 class="movie-container__heading" v-if="getMovieData[0].horror[0]">
          {{ getMovieData[0].horror[0].original_title }}
        </h1>
        <p class="movie-container__paragraph" v-if="getMovieData[0].horror[0]">
          {{ getMovieData[0].horror[0].overview }}
        </p>
        <button
          class="movie-container__btn movie-container__btn--play"
          @click="playShowcaseMovie"
        >
          <font-awesome-icon
            :icon="['fas', 'play']"
            class="movie-container__icon movie-container__icon--play"
          />
          Play
        </button>
        <button
          class="movie-container__btn movie-container__btn--info "
          @click="openMovieDetailsModal"
        >
          <font-awesome-icon
            :icon="['fas', 'info-circle']"
            class="movie-container__icon movie-container__icon--info"
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
          <source src="@/assets/videos/showcase.mp4" type="video/mp4" />
        </video>
      </div>
    </section>

    <section class="sliders-section">
      <div class="slider-container" v-if="getUserMoviesListFromDB">
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
          v-if="searchMovie('popular') === undefined"
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
          v-if="searchMovie('comedy') === undefined"
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
          v-if="searchMovie('crime') === undefined"
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
          v-if="searchMovie('action') === undefined"
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
          v-if="searchMovie('animation') === undefined"
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
          v-if="searchMovie('drama') === undefined"
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
          v-if="searchMovie('horror') === undefined"
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
          v-if="searchMovie('sciFi') === undefined"
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
    <Footer />
  </div>
</template>

<script>
import NavBar from '@/components/layout/nav/Navbar';
import UserMovieList from '@/components/movie-sliders/UserMovieList';
import MovieSlider from '@/components/movie-sliders/MovieSlider';
import MovieModal from '@/components/movie-modals/MovieModal';
import MovieTrailerModal from '@/components/movie-modals/MovieTrailerModal';
import Footer from '@/components/layout/Footer';
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      dataReady: false,
      isMuted: true,
      isPlaying: true,
      isMovieTrailerModalOpen: false,
      isMovieModalOpen: false,
      searchTerm: '',
    };
  },

  components: {
    NavBar,
    UserMovieList,
    MovieSlider,
    MovieModal,
    MovieTrailerModal,
    Footer,
  },

  methods: {
    //Search movie with search term - allow to search with lowercase letters
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
    playShowcaseMovie() {
      const movieId = this.getMovieData[0].horror[0].id;
      this.fetchMovieTrailer(movieId);
      this.isMovieTrailerModalOpen = true;
    },
    openMovieDetailsModal() {
      const movieId = this.getMovieData[0].horror[0].id;
      this.isMovieModalOpen = true;
      this.fetchMovieDetails(movieId);
    },

    ...mapActions([
      'fetchMovieData',
      'setUserMoviesListFromDB',
      'fetchMovieDetails',
      'fetchMovieTrailer',
    ]),
  },

  computed: {
    videoElement() {
      return this.$refs.video;
    },
    ...mapGetters(['getMovieData', 'getUserMoviesListFromDB']),
  },

  mounted() {
    //Since Promise.all waits for all promises to resolve in our action
    //we can just check to see if one of the array is not empty for lazy loading
    //If any of the given promises rejects, it still becomes the error of Promise.all,
    //and all other results are ignored.
    if (this.getMovieData[0].action.length === 0) this.fetchMovieData();
    this.setUserMoviesListFromDB();
    this.getMovieData;
  },
};
</script>

<style lang="scss" scoped>
@import '@/sass/views/_browse.scss';
</style>
