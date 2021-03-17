<template>
  <div class="body">
    <Logo class="logo" />
    <div class="loader-container">
      <div class="loader"></div>
    </div>
  </div>
</template>

<script>
import Logo from '@/components/layout/nav/Logo';

export default {
  components: {
    Logo,
  },

  created() {
    setTimeout(() => {
      this.$router.push({ path: '/browse' });
    }, 2000);
  },
};
</script>

<style lang="scss" scoped>
@import '@/sass/views/_loading-profile.scss';
</style>
