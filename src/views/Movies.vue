!<template>
  <div class="body">
    <NavBar @search="setSearchTerm" />

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
      <div class="card-container" v-if="genres === 'All Genres'">
        <Movie
          :category="!searchTerm ? removeDuplicateMovies : searchMovie(genres)"
        />
      </div>
      <div class="card-container" v-else>
        <Movie
          :category="
            !searchTerm ? this.getMovieData[0][genres] : searchMovie(genres)
          "
        />
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
      searchTerm: '',
    };
  },
  methods: {
    setSearchTerm(value) {
      this.searchTerm = value;
    },
    searchMovie(category) {
      let found;
      if (this.searchTerm !== '') {
        found = this.removeDuplicateMovies.filter((element) =>
          element.original_title.includes(
            this.searchTerm
              .toLowerCase()
              .split(' ')
              .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
              .join(' ')
          )
        );
        return found;
      } else if (this.searchTerm !== '' && category === this.genres) {
        found = this.getMovieData[0][category].filter((element) =>
          element.original_title.includes(
            this.searchTerm
              .toLowerCase()
              .split(' ')
              .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
              .join(' ')
          )
        );
        return found;
      }
    },
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
