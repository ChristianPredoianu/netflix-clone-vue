<template>
  <div>
    <router-link :to="getUser ? '/browse' : '/'">
      <img
        src="@/assets/images/netclone.png"
        alt="Netflix logo"
        class="logo-img"
    /></router-link>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['getUser']),
  },
};
</script>

<style lang="scss" scoped>
@import '@/sass/components/layout/nav/_logo';
</style>
