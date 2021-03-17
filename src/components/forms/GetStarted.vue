<template>
  <div>
    <form class="get-started" @submit.prevent="goToSignup">
      <input
        type="email"
        placeholder="E-mail"
        class="get-started__input"
        required
        v-model="email"
      />

      <input type="submit" value="Get started" class="get-started__btn" />
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';

export default {
  methods: {
    goToSignup() {
      this.$router.push({ name: 'SignupStep1' });
    },

    ...mapActions(['updateEmail']),
  },

  computed: {
    email: {
      get() {
        return this.$store.state.email;
      },
      set(email) {
        this.updateEmail(email);
      },
    },

    ...mapGetters(['getEmail']),
  },
};
</script>

<style lang="scss" scoped>
@import '@/sass/components/forms/_get-started';
</style>
