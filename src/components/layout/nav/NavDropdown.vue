<template>
  <div>
    <dropdown-menu
      v-model="show"
      :right="right"
      :hover="hover"
      :interactive="interactive"
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
        <a class="dropdown__item" href="#">Home</a>
        <a class="dropdown__item" href="#">Series</a>
        <a class="dropdown__item" href="#">Movies</a>
        <a class="dropdown__item" href="#">Popular</a>
        <a class="dropdown__item" href="#">My List</a>
      </div>
    </dropdown-menu>
  </div>
</template>

<script>
import DropdownMenu from '@innologica/vue-dropdown-menu';
export default {
  data() {
    return {
      show: false,
      right: false,
      hover: true,
      interactive: false,
    };
  },
  components: {
    DropdownMenu,
  },
};
</script>

<style lang="scss" scoped>
@import '../../../sass/components/layout/nav/_nav-dropdown.scss';
</style>
