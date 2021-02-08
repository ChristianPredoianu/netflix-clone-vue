<template>
  <div class="profiles-body">
    <nav class="nav"><Logo class="logo" /></nav>
    <div class="wrapper">
      <section class="section-main">
        <div class="profiles-container">
          <h1 class="profiles-container__heading">Manage Profiles</h1>
          <div class="cta-container">
            <div
              class="card"
              v-for="userProfile in getUserProfiles"
              :key="userProfile.id"
            >
              <font-awesome-icon :icon="userProfile.icon" class="card__img" />
              <font-awesome-icon :icon="['far', 'edit']" class="card__edit" />
              <p class="card__name">{{ userProfile.name }}</p>
            </div>
          </div>
          <button class="profiles-container__btn">Done</button>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import Logo from '../components/ui/Logo';
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';
export default {
  components: {
    Logo,
  },
  methods: {
    ...mapActions(['setCurrentUser', 'getUserProfilesFromDB']),
  },
  computed: {
    ...mapGetters(['getCurrentUser', 'getUserProfiles']),
  },
  created() {
    this.setCurrentUser();
    this.getUserProfilesFromDB();
  },
};
</script>

<style lang="scss" scoped>
@import '../sass/views/_profiles.scss';
</style>
