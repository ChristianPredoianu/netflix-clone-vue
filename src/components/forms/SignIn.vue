<template>
  <div>
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
          New to Netclone?
          <router-link to="/"
            ><span class="sign-up-now__span"> Sign up now.</span></router-link
          >
        </p>
        <h1 class="sign-up-now__error">{{ getError }}</h1>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },

  methods: {
    signIn() {
      this.$store
        .dispatch('signUserIn', {
          email: this.email,
          password: this.password,
        })
        .then(() => {
          if (!this.getError) {
            this.$router.push({ name: 'Profiles' });
          }
        });
    },

    ...mapActions(['signUserIn']),
  },

  computed: {
    ...mapGetters(['getError', 'getCreatedMessage']),
  },
};
</script>

<style lang="scss" scoped>
@import '../../sass/components/forms/_sign-in.scss';
</style>
