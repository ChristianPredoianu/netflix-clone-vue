<template>
  <div>
    <router-link :to="getUser ? '/browse' : '/'">
      <img
        src="../../assets/images/netclone.png"
        alt="Netflix logo"
        class="logo"
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
@import '../../sass/components/ui/_logo.scss';
</style>
