<template>
  <div>
    <swiper class="swiper" :options="swiperOption">
      <swiper-slide v-for="crimeMovie in crimeMovies" :key="crimeMovie.id"
        ><img
          :src="`https://image.tmdb.org/t/p/w300${crimeMovie.poster_path}`"
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
    crimeMovies: {
      type: Array,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../sass/components/movie-slider/_movie-slider.scss';
</style>
