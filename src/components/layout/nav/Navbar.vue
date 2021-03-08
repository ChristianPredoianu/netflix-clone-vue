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
          <input type="text" v-if="isSearchBarOpen" class="nav-right__input" />
          <font-awesome-icon
            :icon="['fas', 'search']"
            class="nav-right__icon"
            @click="isSearchBarOpen = !isSearchBarOpen"
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
        <div class="modal-container">
          <div
            class="user-profiles"
            v-for="userProfile in getUserProfiles"
            :key="userProfile.uid"
          >
            <font-awesome-icon
              :icon="[userProfile.icon[0], userProfile.icon[1]]"
              class="user-profiles__icon"
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
        <p class="close-modal" @click="isOpen = false">X</p>
      </div>
    </transition>
    <div
      v-if="isSearchBarOpen"
      class="outside"
      @click="isSearchBarOpen = false"
    ></div>
  </div>
</template>

<script>
import Logo from '../../ui/Logo';
import { mapGetters } from 'vuex';
import NavDropdown from '../../layout/nav/NavDropdown';

export default {
  data() {
    return {
      isSearchBarOpen: false,
      isOpen: false,
      mobileView: true,
      closeOnClickOutside: true,
    };
  },
  components: {
    Logo,
    NavDropdown,
  },
  methods: {
    handleView() {
      this.mobileView = window.innerWidth <= 900;
      console.log(window.innerWidth);
    },
  },

  computed: {
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
