<template>
  <div>
    <header class="header">
      <Logo class="logo" />
      <nav class="nav">
        <ul class="nav-list" v-if="!mobileView">
          <router-link tag="li" to="/browse" class="nav-list__item"
            >Home</router-link
          >
          <router-link tag="li" to="/movies" class="nav-list__item"
            >Movies</router-link
          >
          <router-link tag="li" to="/popular" class="nav-list__item"
            >Popular</router-link
          >
          <router-link tag="li" to="/my-list" class="nav-list__item"
            >My List</router-link
          >
        </ul>

        <NavDropdown v-if="mobileView" />

        <div class="nav-right">
          <div class="input-container" v-if="isSearchBarOpen">
            <input
              type="text"
              class="input-container__input"
              v-model="searchTerm"
              @input="search"
            />
            <font-awesome-icon
              :icon="['fas', 'times']"
              class="nav-right__icon"
              @click="removeSearchTerm"
            />
          </div>
          <font-awesome-icon
            :icon="['fas', 'search']"
            class="nav-right__icon"
            @click="isSearchBarOpen = !isSearchBarOpen"
            v-if="!isPopularView"
          />
          <div>
            <font-awesome-icon
              :icon="[
                getTheClickedProfile.icon[0],
                getTheClickedProfile.icon[1],
              ]"
              class="nav-right__icon nav-right__icon--profile"
              @mouseover="isOpen = true"
              @click="isOpen = true"
            />
          </div>
        </div>
      </nav>
    </header>

    <transition name="fade">
      <div class="modal" v-if="isOpen" @mouseleave="isOpen = false">
        <font-awesome-icon
          :icon="['fas', 'times']"
          class="modal__close-modal"
          @click="isOpen = false"
        />
        <div class="modal-container">
          <div
            class="user-profiles"
            v-for="userProfile in getUserProfiles"
            :key="userProfile.uid"
          >
            <font-awesome-icon
              :icon="[userProfile.icon[0], userProfile.icon[1]]"
              class="user-profiles__icon"
              @click="goToBrowseWithSelectedProfile(userProfile)"
            />
            <p class="user-profiles__paragraph">{{ userProfile.name }}</p>
          </div>
          <p
            class="user-profiles__paragraph user-profiles__paragraph--manage"
            @click="$router.push({ name: 'ManageProfiles' })"
          >
            Manage profiles
          </p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Logo from '../../ui/Logo';
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';
import NavDropdown from '../../layout/nav/NavDropdown';

export default {
  data() {
    return {
      isSearchBarOpen: false,
      isOpen: false,
      mobileView: true,
      searchTerm: '',
    };
  },
  components: {
    Logo,
    NavDropdown,
  },
  methods: {
    goToBrowseWithSelectedProfile(userProfile) {
      this.setClickedProfile(userProfile);
      this.$router.push({ path: '/loading-profile' });
    },
    search() {
      this.$emit('search', this.searchTerm);
    },
    removeSearchTerm() {
      this.searchTerm = '';
      this.search();
      this.isSearchBarOpen = false;
    },
    handleView() {
      this.mobileView = window.innerWidth <= 900;
      console.log(window.innerWidth);
    },
    ...mapActions(['setClickedProfile']),
  },

  computed: {
    isPopularView() {
      return this.$route.name === 'Popular';
    },

    ...mapGetters(['getTheClickedProfile', 'getUserProfiles']),
  },
  created() {
    this.handleView();
    window.addEventListener('resize', this.handleView);
  },
};
</script>

<style lang="scss" scoped>
@import '../../../sass/components/layout/nav/_nav-bar.scss';
</style>
