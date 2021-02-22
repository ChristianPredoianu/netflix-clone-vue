<template>
  <div>
    <MovieModal
      v-if="isModalOpen"
      @closeModal="isModalOpen = false"
      :movieDetails="getMovieDetails"
    />

    <swiper class="swiper" :options="swiperOption">
      <swiper-slide
        v-for="popularMovie in popularMovies"
        :key="popularMovie.id"
      >
        <img
          :src="`https://image.tmdb.org/t/p/w300${popularMovie.poster_path}`"
          class="swiper-slide__img"
        />
        <div class="overlay">
          <img
            :src="`https://image.tmdb.org/t/p/w300${popularMovie.poster_path}`"
            class="overlay__img"
          />
          <div class="icon-container">
            <div class="left">
              <div class="tooltip-remove">
                <span class="tooltip-remove__text" v-if="isRemoveHovered"
                  >Remove from list</span
                >
              </div>
              <font-awesome-icon
                :icon="['far', 'play-circle']"
                class="left__icon left__icon--play"
              />

              <font-awesome-icon
                :icon="['far', 'times-circle']"
                class="left__icon left__icon--check"
                @mouseover="isRemoveHovered = true"
                @mouseleave="isRemoveHovered = false"
              />

              <font-awesome-icon
                :icon="['far', 'thumbs-up']"
                class="left__icon left__icon__up"
                :class="{ 'icon-like': popularMovie.active }"
                @click="toggleActive(popularMovie)"
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
                @click="openMovieDetailsModal(popularMovie)"
              />
            </div>
          </div>
          <div class="info-container">
            <p class="info-container__movie-title">{{ popularMovie.title }}</p>
            <p>
              Release:
              {{
                popularMovie.release_date
                  ? popularMovie.release_date
                  : popularMovie.first_air_date
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
/* import 'swiper/dist/css/swiper.css';
import { swiper, swiperSlide } from 'vue-awesome-swiper'; */
import MovieModal from '../ui/MovieModal';
import sliderConfig from '../../mixins/sliderConfig';
import { mapGetters } from 'vuex';

export default {
  mixins: [sliderConfig],
  props: {
    popularMovies: {
      type: Array,
    },
  },

  data() {
    return {
      isRemoveHovered: false,
      isDetailsHovered: false,
      isIconClicked: false,
      isModalOpen: false,
      items: [],
    };
  },

  components: {
    MovieModal,
  },

  methods: {
    openMovieDetailsModal(selectedMovie) {
      console.log(selectedMovie.id);
      this.isModalOpen = true;
      this.$store.dispatch('fetchMovieDetails', selectedMovie.id);
      console.log(this.getMovieDetails);
    },
    toggleActive(popularMovie) {
      popularMovie.active = !popularMovie.active;
      console.log(popularMovie);
    },
  },
  computed: {
    ...mapGetters(['getMovieDetails']),
  },
};
</script>

<style lang="scss" scoped>
@import '../../sass/components/movie-slider/_movie-slider.scss';
</style>
