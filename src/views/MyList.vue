!<template>
  <div class="my-list">
    <NavBar />
    <section class="movies-list">
      <div
        class="card"
        v-for="movie in getUserMoviesListFromDB"
        :key="movie.id"
      >
        <img
          :src="`https://image.tmdb.org/t/p/w300${movie.backdrop_path}`"
          class="swiper-slide__img"
        />
      </div>
      <button @click="test">test</button>
    </section>
  </div>
</template>

<script>
import NavBar from '../components/layout/nav/Navbar';
import { mapGetters } from 'vuex';

export default {
  components: {
    NavBar,
  },
  methods: {
    test() {},
  },
  computed: {
    ...mapGetters(['getUserMoviesListFromDB']),
  },
};
</script>

<style lang="scss" scoped>
@import '../sass/views/_my-list.scss';
</style>
