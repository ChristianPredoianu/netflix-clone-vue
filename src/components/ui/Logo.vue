<template>
  <div>
    <img
      src="../../assets/images/netflix-logo.png"
      alt="Netflix logo"
      class="logo"
      @click="goToHome"
    />
  </div>
</template>
<script>
export default {
  methods: {
    goToHome() {
      this.$router.push({ name: 'Home' }).catch(() => {});
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../sass/components/ui/_logo.scss';
</style>
