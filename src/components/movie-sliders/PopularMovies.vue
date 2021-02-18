<template>
  <div>
    <swiper class="swiper" :options="swiperOption">
      <swiper-slide
        v-for="(popularMovie, index) in popularMovies"
        :key="popularMovie.id"
      >
        <img
          :src="`https://image.tmdb.org/t/p/w300${popularMovie.poster_path}`"
          class="swiper-slide__img"
        />
        <h1>{{ index }}</h1>
        <div class="overlay">
          <img
            :src="`https://image.tmdb.org/t/p/w300${popularMovie.poster_path}`"
            class="overlay__img"
          />
          <div class="icon-container">
            <div class="left">
              <div class="tooltip">
                <span class="tooltip__text" v-if="isIconHovered"
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
                @mouseover="isIconHovered = true"
                @mouseleave="isIconHovered = false"
                @click="getClickedMovie(popularMovie)"
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
              <font-awesome-icon
                :icon="['fas', 'arrow-circle-down']"
                class="right__icon right__icon--arrow"
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
import sliderConfig from '../../mixins/sliderConfig';
export default {
  mixins: [sliderConfig],
  props: {
    popularMovies: {
      type: Array,
    },
  },
  data() {
    return {
      isIconHovered: false,
      isIconClicked: false,
      items: [],
    };
  },
  methods: {
    getClickedMovie(popularMovie) {
      console.log(popularMovie);
    },
    toggleActive(popularMovie) {
      popularMovie.active = !popularMovie.active;
      console.log(popularMovie);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../sass/components/movie-slider/_movie-slider.scss';
</style>
