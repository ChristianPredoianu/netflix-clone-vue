!<template>
  <div class="body">
    <NavBar />

    <section class="genres-container">
      <h1 class="genres-container__heading">Movies</h1>
      <select name="genres" class="select decorated" v-model="genres">
        <option disabled value="" class="select__option">Genres</option>
        <option selected class="select__option">All Genres</option>
        <option class="select__option">action</option>
        <option class="select__option">comedy</option>
        <option class="select__option">crime</option>
        <option class="select__option">animation</option>
        <option class="select__option">drama</option>
        <option class="select__option">horror</option>
        <option class="select__option">sciFi</option>
      </select>
    </section>

    <section class="movies-list">
      <div class="card-container" v-if="genres == 'All Genres'">
        <Movie :category="removeDuplicateMovies" />
      </div>
      <div class="card-container" v-else>
        <Movie :category="this.getMovieData[0][genres]" />
      </div>
    </section>
  </div>
</template>

<script>
import NavBar from '../components/layout/nav/Navbar';
import DropdownMenu from '@innologica/vue-dropdown-menu';
import Movie from '../components/movie/Movie';

import { mapGetters } from 'vuex';

export default {
  components: {
    NavBar,
    DropdownMenu,
    Movie,
  },
  data() {
    return {
      isModalOpen: false,
      allMovies: [],
      genres: 'All Genres',
    };
  },

  computed: {
    restructureMovieData() {
      let moviesArr = [];
      const arr = Object.values(this.getMovieData[0]);
      for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
          moviesArr.push(arr[i][j]);
        }
      }
      this.allMovies = moviesArr;
    },

    //https://stackoverflow.com/questions/45439961/remove-duplicate-values-from-an-array-of-objects-in-javascript
    removeDuplicateMovies() {
      const uniqueMovies = Array.from(
        new Set(this.allMovies.map((movie) => movie.id))
      ).map((id) => {
        return this.allMovies.find((movie) => movie.id === id);
      });

      return uniqueMovies;
    },

    ...mapGetters(['getMovieData']),
  },

  created() {
    this.restructureMovieData;
    this.filterGenres;
  },
};
</script>

<style lang="scss" scoped>
@import '../sass/views/_movies.scss';
</style>
