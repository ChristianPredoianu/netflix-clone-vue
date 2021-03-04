!<template>
  <div class="body">
    <NavBar />
    <MovieModal v-if="isModalOpen" @closeModal="isModalOpen = false" />
    <button @click="test">jkghj</button>
    <section class="genres-container">
      <h1 class="genres-container__heading">Movies</h1>
      <select name="genres" class="select decorated" v-model="genres">
        <option disabled value="" class="select__option">Genres</option>
        <option selected class="select__option">All Genres</option>
        <option class="select__option">action</option>
        <option class="select__option">comedy</option>
        <option class="select__option">crime</option>
        <option class="select__option">documentary</option>
        <option class="select__option">drama</option>
        <option class="select__option">horror</option>
        <option class="select__option">sciFi</option>
      </select>
    </section>

    <section class="movies-list">
      <div class="card-container" v-if="genres == 'All Genres'">
        <div
          class="card"
          v-for="movie in removeDuplicateMovies"
          :key="movie.id"
        >
          <img :src="`https://image.tmdb.org/t/p/w300${movie.poster_path}`" />
          <div class="overlay">
            <img
              :src="`https://image.tmdb.org/t/p/w300${movie.poster_path}`"
              class="overlay__img"
            />
            <div class="icon-container">
              <div class="left">
                <font-awesome-icon
                  title="Play movie"
                  :icon="['far', 'play-circle']"
                  class="left__icon left__icon--play"
                />

                <font-awesome-icon
                  title="Remove Movie"
                  :icon="['far', 'times-circle']"
                  class="left__icon left__icon--check"
                  @click="removeFromMyList(movie)"
                />
              </div>
              <div class="right">
                <font-awesome-icon
                  title="Movie Details"
                  :icon="['fas', 'arrow-circle-down']"
                  class="right__icon right__icon--arrow"
                  @click="openMovieDetailsModal(movie)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card-container" v-else>
        <div
          class="card"
          v-for="movie in this.getMovieData[0][genres]"
          :key="movie.id"
        >
          <img :src="`https://image.tmdb.org/t/p/w300${movie.poster_path}`" />
          <div class="overlay">
            <img
              :src="`https://image.tmdb.org/t/p/w300${movie.poster_path}`"
              class="overlay__img"
            />
            <div class="icon-container">
              <div class="left">
                <font-awesome-icon
                  title="Play movie"
                  :icon="['far', 'play-circle']"
                  class="left__icon left__icon--play"
                />

                <font-awesome-icon
                  title="Remove Movie"
                  :icon="['far', 'times-circle']"
                  class="left__icon left__icon--check"
                  @click="removeFromMyList(movie)"
                />
              </div>
              <div class="right">
                <font-awesome-icon
                  title="Movie Details"
                  :icon="['fas', 'arrow-circle-down']"
                  class="right__icon right__icon--arrow"
                  @click="openMovieDetailsModal(movie)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import NavBar from '../components/layout/nav/Navbar';
import DropdownMenu from '@innologica/vue-dropdown-menu';
import MovieModal from '../components/ui/MovieModal';
import { mapGetters } from 'vuex';

export default {
  components: {
    NavBar,
    DropdownMenu,
    MovieModal,
  },
  data() {
    return {
      show: false,
      right: false,
      hover: true,
      interactive: false,
      isModalOpen: false,
      allMovies: [],
      genres: 'All Genres',
    };
  },
  methods: {
    test() {
      if (this.getMovieData[0].hasOwnPropery(this.genres)) {
        console.log('it has');
      } else {
        console.log('it hasnt');
      }
    },
    openMovieDetailsModal(selectedMovie) {
      console.log(selectedMovie.id);
      this.isModalOpen = true;
      this.$store.dispatch('fetchMovieDetails', selectedMovie.id);
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
    removeDuplicateMovies() {
      const uniqueMovies = Array.from(
        new Set(this.allMovies.map((movie) => movie.id))
      ).map((id) => {
        return this.allMovies.find((movie) => movie.id === id);
      });
      console.log(uniqueMovies);

      return uniqueMovies;
    },
    filterGenres() {
      console.log(this.getMovieData);
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
