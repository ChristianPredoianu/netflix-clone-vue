<template>
  <div>
    <MovieModal v-if="isModalOpen" @closeModal="isModalOpen = false" />
    <MovieTrailerModal
      v-if="isMovieTrailerModalOpen"
      @closeModal="isMovieTrailerModalOpen = false"
    />
    <swiper class="swiper" :options="swiperOption">
      <swiper-slide v-for="movie in category" :key="movie.id">
        <img
          :src="`https://image.tmdb.org/t/p/w300${movie.poster_path}`"
          class="swiper-slide__img"
        />

        <div class="overlay">
          <div class="icon-container">
            <div class="left">
              <font-awesome-icon
                title="Play Movie"
                :icon="['far', 'play-circle']"
                class="left__icon left__icon--play"
                @click="playMovie(movie)"
              />

              <font-awesome-icon
                title="Add To List"
                :icon="['fas', 'plus-circle']"
                class="left__icon left__icon--check"
                @click="addToMovieList(movie)"
                v-if="!isMovieInUserList(movie)"
              />

              <font-awesome-icon
                title="Delete From List"
                :icon="['far', 'times-circle']"
                class="left__icon left__icon--check"
                @click="deleteMovie(movie)"
                v-else
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
import isMovieInUserList from '@/mixins/isMovieInUserList';
import addMovieToUserList from '@/mixins/addMovieToUserList';
import deleteMovieFromUserList from '@/mixins/deleteMovieFromUserList';
import { mapActions } from 'vuex';
import { mapGetters } from 'vuex';

export default {
  mixins: [isMovieInUserList, addMovieToUserList, deleteMovieFromUserList],

  props: {
    category: {
      type: [Array, Function],
    },
    currentUser: {
      type: Object,
    },
    clickedProfile: {
      type: Object,
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

      swiperOption: {
        slidesPerView: 6,
        spaceBetween: 20,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },

        breakpoints: {
          1851: {
            slidesPerView: 5,
            spaceBetween: 40,
          },
          1522: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1185: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          900: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
        },
      },
    };
  },

  methods: {
    playMovie(selectedMovie) {
      this.isMovieTrailerModalOpen = true;
      this.fetchMovieTrailer(selectedMovie.id);
    },
    openMovieDetailsModal(selectedMovie) {
      this.isModalOpen = true;
      this.fetchMovieDetails(selectedMovie.id);
    },
    toggleActive(popularMovie) {
      popularMovie.active = !popularMovie.active;
      console.log(popularMovie);
    },

    ...mapActions([
      'setUserMoviesListFromDB',
      'fetchMovieTrailer',
      'fetchMovieDetails',
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
    top: 7rem;
  }

  @include respond(fold) {
    top: 5rem;
  }
}
.swiper-button-prev {
  @include respond(phone) {
    top: 7rem;
  }

  @include respond(fold) {
    top: 5rem;
  }
}
</style>
