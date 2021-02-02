<template>
  <div>
    <nav class="nav-signup">
      <Logo />
      <p class="nav-signup__sign-in">Sign In</p>
    </nav>
  </div>
</template>

<script>
import Logo from './Logo';

export default {
  components: {
    Logo,
  },
};
</script>

<style lang="scss" scoped>
@import '../../sass/components/ui/_nav-sign-up.scss';
</style>
