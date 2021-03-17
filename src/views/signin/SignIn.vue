<template class="signin">
  <div>
    <Logo class="logo" />
    <section class="main">
      <div class="form-container">
        <Sign-in />
      </div>
    </section>
  </div>
</template>

<script>
import Logo from '@/components/layout/nav/Logo';
import SignIn from '@/components/forms/SignIn';

export default {
  components: {
    Logo,
    SignIn,
  },
};
</script>

<style lang="scss" scoped>
@import '../../sass/views/signin/signin';
</style>
