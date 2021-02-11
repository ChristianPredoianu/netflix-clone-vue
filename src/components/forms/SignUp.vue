<template>
  <div>
    <form class="step-2-form" @submit.prevent="signup">
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: this.$store.state.forms.email,
      password: '',
    };
  },
  methods: {
    signup() {
      this.$store.dispatch('signUserUp', {
        email: this.email,
        password: this.password,
      });
    },
  },
  computed: {},
};
</script>

<style lang="scss" scoped>
@import '../../sass/components/forms/_sign-up.scss';
</style>
