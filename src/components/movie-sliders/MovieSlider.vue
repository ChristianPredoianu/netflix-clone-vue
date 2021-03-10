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
          <img
            :src="`https://image.tmdb.org/t/p/w300${movie.poster_path}`"
            class="overlay__img"
          />
          <div class="icon-container">
            <div class="left">
              <div class="tooltip-remove">
                <span class="tooltip-remove__text" v-if="isRemoveHovered"
                  >Add to list</span
                >
              </div>

              <font-awesome-icon
                title="play"
                :icon="['far', 'play-circle']"
                class="left__icon left__icon--play"
                @click="playMovie(movie)"
              />

              <font-awesome-icon
                :icon="['far', 'check-circle']"
                class="left__icon left__icon--check"
                @mouseover="isRemoveHovered = true"
                @mouseleave="isRemoveHovered = false"
                @click="addToMovieList(movie)"
                v-if="!isMovieInUserList(movie)"
              />

              <font-awesome-icon
                title="Delete Movie"
                :icon="['far', 'times-circle']"
                class="left__icon left__icon--check"
                @click="deleteMovie(movie)"
                v-else
              />

              <font-awesome-icon
                :icon="['far', 'thumbs-up']"
                class="left__icon left__icon__up"
                :class="{ 'icon-like': movie.active }"
                @click="toggleActive(movie)"
              />
              <font-awesome-icon
                :icon="['far', 'thumbs-down']"
                class="left__icon left__down"
              />
            </div>
            <div class="right">
              <div class="tooltip-details">
                <span class="tooltip-details__text" v-if="isDetailsHovered"
                  >More info
                </span>
              </div>
              <font-awesome-icon
                :icon="['fas', 'arrow-circle-down']"
                class="right__icon right__icon--arrow"
                @mouseover="isDetailsHovered = true"
                @mouseleave="isDetailsHovered = false"
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
import MovieModal from '../ui/MovieModal';
import MovieTrailerModal from '../ui/MovieTrailerModal';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';
import { mapActions } from 'vuex';
import { mapGetters } from 'vuex';
import isMovieInUserList from '../../mixins/isMovieInUserList';
import addMovieToUserList from '../../mixins/addMovieToUserList';
import deleteMovieFromUserList from '../../mixins/deleteMovieFromUserList';
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
    MovieModal,
    MovieTrailerModal,
    swiper,
    swiperSlide,
  },
  data() {
    return {
      isRemoveHovered: false,
      isDetailsHovered: false,
      isIconClicked: false,
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
      console.log(selectedMovie.id);
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
</style>
