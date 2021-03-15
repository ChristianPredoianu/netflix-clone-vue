<template>
  <div>
    <form class="step-2-form" @submit.prevent="signUp">
      <input
        type="email"
        placeholder="E-mail"
        required
        class="step-2-form__input"
        v-model="email"
      />

      <input
        type="password"
        placeholder="Password"
        minlength="6"
        maxlength="60"
        required
        class="step-2-form__input"
        v-model="password"
      />
      <input type="submit" value="Continue" class="step-2-form__btn" />
    </form>
    <h1>{{ getError }}</h1>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      email: this.$store.state.forms.email,
      password: '',
    };
  },
  methods: {
    signUp() {
      this.signUserUp({
        email: this.email,
        password: this.password,
      }).then(() => {
        if (!this.getError) {
          this.$router.push({ name: 'SignIn' });
        }
      });
    },

    ...mapActions(['signUserUp']),
  },
  computed: {
    ...mapGetters(['getError']),
  },
};
</script>

<style lang="scss" scoped>
@import '../../sass/components/forms/_sign-up.scss';
</style>
