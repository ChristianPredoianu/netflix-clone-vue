!<template>
  <div>
    <div class="body">
      <NavBar @search="setSearchTerm" />
      <div>
        <section class="genres">
          <h1 class="genres__heading">Movies</h1>
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
          <div
            class="card-container"
            v-if="!searchTerm && genres === 'All Genres'"
          >
            <Movie
              v-for="movie in removeDuplicateMovies"
              :key="movie.id"
              :movie="movie"
            />
          </div>

          <div class="card-container" v-if="!searchTerm">
            <Movie
              v-for="movie in this.getMovieData[0][genres]"
              :key="movie.id"
              :movie="movie"
            />
          </div>

          <div class="card-container" v-else>
            <h1
              class="card-container__heading"
              v-if="searchMovie(genres).length === 0"
            >
              No Movies found in {{ genres }}
            </h1>
            <Movie
              v-for="movie in this.searchMovie(genres)"
              :key="movie.id"
              :movie="movie"
            />
          </div>
        </section>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import NavBar from '@/components/layout/nav/Navbar';
import DropdownMenu from '@innologica/vue-dropdown-menu';
import Movie from '@/components/movie/Movie';
import Footer from '@/components/layout/Footer';
import { mapGetters } from 'vuex';

export default {
  components: {
    NavBar,
    DropdownMenu,
    Movie,
    Footer,
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

    //Search for movie
    searchMovie(category) {
      if (this.searchTerm !== '' && category === 'All Genres') {
        return this.findMovie(this.removeDuplicateMovies);
      } else if (this.searchTerm !== '' && category === this.genres) {
        return this.findMovie(this.getMovieData[0][category]);
      }
    },

    //Find movie - allow lowercase letters
    findMovie(moviesObj) {
      let found = moviesObj.filter((element) =>
        element.original_title.includes(
          this.searchTerm
            .toLowerCase()
            .split(' ')
            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ')
        )
      );
      return found;
    },
  },

  computed: {
    //Restructure movie data to be able to show all movies
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
  },
};
</script>

<style lang="scss" scoped>
@import '@/sass/views/_movies.scss';
</style>
