<template>
  <div>
    <dropdown-menu
      v-model="show"
      :right="right"
      :hover="hover"
      :interactive="interactive"
      :closeOnClickOutside="closeOnClickOutside"
    >
      <button class="btn btn-primary dropdown-toggle">
        Browse
        <font-awesome-icon
          :icon="['fas', 'angle-down']"
          class="dropdown__icon"
        />
      </button>
      <div slot="dropdown" class="dropdown__container">
        <div class="dropdown__topbar"></div>
        <router-link to="/browse" class="dropdown__item">Home</router-link>
        <router-link to="/movies" class="dropdown__item">Movies</router-link>
        <router-link to="/popular" class="dropdown__item">Popular</router-link>
        <router-link to="/my-list" class="dropdown__item">My list</router-link>
      </div>
    </dropdown-menu>
  </div>
</template>

<script>
import DropdownMenu from '@innologica/vue-dropdown-menu';

export default {
  components: {
    DropdownMenu,
  },

  data() {
    return {
      show: false,
      right: false,
      hover: true,
      interactive: false,
      closeOnClickOutside: true,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '../../../sass/components/layout/nav/_nav-dropdown.scss';
</style>
