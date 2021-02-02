<template>
  <div>
    <header>
      <NavSignUp />
    </header>
    <section class="step-1-section">
      <div class="icons-container">
        <font-awesome-icon
          :icon="['fas', 'laptop']"
          class="icons-container__icon"
        />
        <font-awesome-icon
          :icon="['fas', 'tv']"
          class="icons-container__icon"
        />
        <font-awesome-icon
          :icon="['fas', 'mobile-alt']"
          class="icons-container__icon"
        />
      </div>
      <div class="step-1-info">
        <p class="step-1-info__paragraph">
          Step <span class="step-1-info__span">1</span> of
          <span class="step-1-info__span">2</span>
        </p>
        <h1 class="step-1-info__heading-primary">
          Finish setting up your account
        </h1>
        <h2 class="step-1-info__heading-secondary">
          Netflix is personalised for you. Create a password to watch Netflix on
          any device at any time.
        </h2>
        <button class="step-1-info__btn" @click="goToStep2">Continue</button>
      </div>
    </section>
  </div>
</template>

<script>
import NavSignUp from '../../components/ui/NavSignUp';

export default {
  components: {
    NavSignUp,
  },

  methods: {
    goToStep2() {
      this.$router.push({ name: 'SignupStep2' });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../sass/views/signup/step1';
</style>
