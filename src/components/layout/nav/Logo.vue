<template>
  <div>
    <router-link :to="getCurrentUser.email !== null ? '/browse' : '/'">
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
    ...mapGetters(['getCurrentUser']),
  },
};
</script>

<style lang="scss" scoped>
@import '@/sass/components/layout/nav/_logo';
</style>
