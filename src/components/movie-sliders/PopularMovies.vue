<template>
  <div>
    <swiper class="swiper" :options="swiperOption">
      <swiper-slide v-for="popularMovie in popularMovies" :key="popularMovie.id"
        ><img
          :src="`https://image.tmdb.org/t/p/w300${popularMovie.poster_path}`"
        />
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
};
</script>

<style lang="scss" scoped>
@import '../../sass/components/movie-slider/_movie-slider.scss';
</style>
