<template>
  <div>
    <MovieModal v-if="isModalOpen" @closeModal="isModalOpen = false" />
    <MovieTrailerModal
      v-if="isMovieTrailerModalOpen"
      @closeModal="isMovieTrailerModalOpen = false"
    />

    <swiper class="swiper" :options="swiperOption">
      <swiper-slide v-for="movie in userMovieList" :key="movie.id">
        <img
          :src="`https://image.tmdb.org/t/p/w300${movie.poster_path}`"
          class="swiper-slide__img "
          alt="movie poster"
        />

        <div class="overlay">
          <div class="icon-container">
            <div class="left">
              <font-awesome-icon
                title="Play Movie"
                :icon="['fas', 'play-circle']"
                class="left__icon left__icon--play"
                @click="playMovie(movie.id)"
              />

              <font-awesome-icon
                title="Delete Movie"
                :icon="['fas', 'times-circle']"
                class="left__icon left__icon--check"
                @click="deleteMovie(movie)"
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
              {{
                movie.release_date ? movie.release_date : movie.first_air_date
              }}
            </p>
          </div>
        </div>
      </swiper-slide>

      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </swiper>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';
import MovieModal from '@/components/movie-modals/MovieModal';
import MovieTrailerModal from '@/components/movie-modals/MovieTrailerModal';
import sliderConfig from '@/mixins/sliderConfig';
import deleteMovieFromUserList from '@/mixins/deleteMovieFromUserList';
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';

export default {
  mixins: [sliderConfig, deleteMovieFromUserList],

  props: {
    userMovieList: {
      type: Array,
    },
  },

  components: {
    swiper,
    swiperSlide,
    MovieModal,
    MovieTrailerModal,
  },

  data() {
    return {
      isModalOpen: false,
      isMovieTrailerModalOpen: false,
    };
  },

  methods: {
    openMovieDetailsModal(selectedMovie) {
      console.log(selectedMovie.id);
      this.isModalOpen = true;
      this.fetchMovieDetails(selectedMovie.id);
    },
    playMovie(movieId) {
      this.isMovieTrailerModalOpen = true;
      this.fetchMovieTrailer(movieId);
    },
    toggleActive(popularMovie) {
      popularMovie.active = !popularMovie.active;
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
};
</script>

<style lang="scss" scoped>
@import '../../sass/components/movie-slider/_movie-slider.scss';
@import '../../sass/components/_overlay.scss';
.swiper-button-next {
  @include respond(phone) {
    top: 5rem;
  }

  @include respond(fold) {
    top: 3rem;
  }
}
.swiper-button-prev {
  @include respond(phone) {
    top: 5rem;
  }

  @include respond(fold) {
    top: 3rem;
  }
}
</style>
