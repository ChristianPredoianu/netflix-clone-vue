!<template>
  <div>
    <div class="body">
      <NavBar />
      <div>
        <section class="popular-movies">
          <h1 class="popular-movies__heading">Popular Movies</h1>
        </section>
        <section class="movie-sliders">
          <MovieSlider
            :category="getMovieData[0].popular"
            class="popular-movies__slider"
          />
        </section>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import NavBar from '@/components/layout/nav/Navbar';
import MovieSlider from '@/components/movie-sliders/MovieSlider';
import Footer from '@/components/layout/Footer';
import { mapGetters } from 'vuex';

export default {
  components: {
    NavBar,
    MovieSlider,
    Footer,
  },

  computed: {
    ...mapGetters(['getMovieData']),
  },
};
</script>

<style lang="scss" scoped>
@import '@/sass/views/_popular.scss';
</style>
