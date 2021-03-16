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
            v-if="!hideSearchBarOnRoutes"
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
            <p
              class="user-profiles__paragraph"
              @click="goToBrowseWithSelectedProfile(userProfile)"
            >
              {{ userProfile.name }}
            </p>
          </div>
          <p
            class="user-profiles__paragraph user-profiles__paragraph--manage"
            @click="$router.push({ name: 'ManageProfiles' })"
          >
            Manage profiles
          </p>
          <p
            class="user-profiles__paragraph user-profiles__paragraph--signout"
            @click="signOut"
          >
            Signout
          </p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Logo from '@/components/ui/Logo';
import NavDropdown from '@/components/layout/nav/NavDropdown';
import firebase from 'firebase/app';
import 'firebase/auth';
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';

export default {
  components: {
    Logo,
    NavDropdown,
  },

  data() {
    return {
      isSearchBarOpen: false,
      isOpen: false,
      mobileView: true,
      isChangeProfile: false,
      searchTerm: '',
    };
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
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push({ path: '/signin' });
          this.setUser(null);
        })
        .catch((error) => {
          console.log(error.message);
        });
    },
    handleView() {
      this.mobileView = window.innerWidth <= 900;
      console.log(window.innerWidth);
    },

    ...mapActions(['setClickedProfile', 'setUser']),
  },

  computed: {
    hideSearchBarOnRoutes() {
      const popularView = this.$route.name === 'Popular';
      const myListView = this.$route.name === 'My-list';
      if (popularView || myListView) {
        return [popularView, myListView];
      }
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
