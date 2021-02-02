<template class="signin">
  <div>
    <Logo class="logo" />
    <section class="main">
      <div class="form-container">
        <form class="signin-form" @submit.prevent="signIn">
          <h1 class="signin-form__heading">Sign In</h1>
          <input
            type="email"
            placeholder="E-mail"
            required
            class="signin-form__input"
            v-model="email"
          />

          <input
            type="password"
            placeholder="Password"
            minlength="6"
            maxlength="60"
            required
            class="signin-form__input"
            v-model="password"
          />
          <input type="submit" value="Sign In" class="signin-form__btn" />
          <div class="sign-up-now">
            <p class="sign-up-now__paragraph">
              New to Netflix?
              <router-link to="/"
                ><span class="sign-up-now__span">
                  Sign up now.</span
                ></router-link
              >
            </p>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
import Logo from '../../components/ui/Logo';

export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  components: {
    Logo,
  },

  methods: {
    signIn() {
      this.$store.dispatch('signUserIn', {
        email: this.email,
        password: this.password,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../sass/views/signin/signin';
</style>
