<template>
  <div>
    <header>
      <NavSignUp />
    </header>

    <section class="section-step-2-main">
      <div class="section-container">
        <div class="step-2-info">
          <p class="step-2-info__paragraph">
            Step <span class="step-2-info__span">2</span> of
            <span class="step-2-info__span">2</span>
          </p>
          <h1 class="step-2-info__heading-primary">
            Finish setting up your account
          </h1>
          <h2 class="step-2-info__heading-secondary">
            Netflix is personalised for you. Create a password to watch Netflix
            on any device at any time.
          </h2>
        </div>
        <SignUp />
        <div class="signup-messages">
          <h1>{{ getError }}</h1>
          <h1>{{ getCreatedMessage }}</h1>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import NavSignUp from '../../components/ui/NavSignUp';
import SignUp from '../../components/forms/SignUp';
import { mapGetters } from 'vuex';
export default {
  components: {
    NavSignUp,
    SignUp,
  },

  computed: {
    ...mapGetters({
      getError: 'getError',
      getCreatedMessage: 'getCreatedMessage',
    }),
  },
};
</script>

<style lang="scss" scoped>
@import '../../sass/views/signup/step2';
</style>
