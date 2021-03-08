!<template>
  <div class="body">
    <NavBar />

    <section class="popular-movies">
      <h1 class="popular-movies__heading">Popular Movies</h1>
      <MovieSlider
        :category="getMovieData[0].popular"
        class="popular-movies__slider"
      />
    </section>
  </div>
</template>

<script>
import NavBar from '../components/layout/nav/Navbar';
import MovieSlider from '../components/movie-sliders/MovieSlider';
import { mapGetters } from 'vuex';
export default {
  components: {
    NavBar,
    MovieSlider,
  },

  computed: {
    ...mapGetters(['getMovieData']),
  },
};
</script>

<style lang="scss" scoped>
@import '../sass/views/_popular.scss';
</style>
