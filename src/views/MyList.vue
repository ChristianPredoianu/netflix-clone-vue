!<template>
  <div class="my-list">
    <NavBar />

    <section class="movies-list">
      <h1 class="movies-list__heading">My List</h1>

      <div class="card-container">
        <div
          class="card"
          v-for="movie in getUserMoviesListFromDB"
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
import firebase from 'firebase';
import NavBar from '../components/layout/nav/Navbar';
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';

export default {
  components: {
    NavBar,
  },

  methods: {
    removeFromMyList(movie) {
      const databaseRef = `users/${this.getCurrentUser.id}`;
      const child = `profiles/${this.getTheClickedProfile.id}/moviesList`;
      firebase
        .database()
        .ref(databaseRef)
        .child(child)
        .orderByChild('id')
        .equalTo(movie.id)
        .once('child_added', (snapshot) => {
          snapshot.ref.remove();
        });
      this.setUserMoviesListFromDB();
    },
    ...mapActions(['setUserMoviesListFromDB']),
  },
  computed: {
    ...mapGetters(['getUserMoviesListFromDB']),
  },
};
</script>

<style lang="scss" scoped>
@import '../sass/views/_my-list.scss';
</style>
