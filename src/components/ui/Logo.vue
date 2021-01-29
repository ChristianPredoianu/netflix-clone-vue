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
import '../../sass/components/ui/_logo.scss';
export default {
  methods: {
    goToHome() {
      this.$router.push({ name: 'Home' }).catch(() => {});
    },
  },
};
</script>
