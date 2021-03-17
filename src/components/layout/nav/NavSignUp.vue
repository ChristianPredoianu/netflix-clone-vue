<template>
  <div>
    <nav class="nav-signup">
      <Logo />
      <router-link tag="p" :to="{ path: '/signIn' }"
        ><p class="nav-signup__sign-in">Sign In</p></router-link
      >
    </nav>
  </div>
</template>

<script>
import Logo from '@/components/layout/nav/Logo';

export default {
  components: {
    Logo,
  },
};
</script>

<style lang="scss" scoped>
@import '@/sass/components/layout/nav/_nav-sign-up';
</style>
