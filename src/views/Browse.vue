<template>
  <div>
    <section class="showcase">
      <NavBar class="nav" />
      <div class="video-container">
        <video class="video" poster="poster.JPG" autoplay muted loop>
          <source
            src="../assets/videos/pexels-vlado-pitbullgrif-6650121.mp4"
            type="video/mp4"
          />
        </video>
        <div class="overlay"></div>
      </div>
    </section>
  </div>
</template>

<script>
import NavBar from '../components/layout/nav/Navbar';
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';

export default {
  components: {
    NavBar,
  },
  methods: {
    ...mapActions(['fetchMovieData']),
  },
  computed: {
    ...mapGetters(['getMovieData']),
  },
  created() {
    this.fetchMovieData();
  },
};
</script>

<style lang="scss" scoped>
.showcase {
  position: relative;
  right: 0;
  width: 100%;
  min-height: 100vh;
}

.nav {
  position: absolute;
  z-index: 5;
}
.video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
