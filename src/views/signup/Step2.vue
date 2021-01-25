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

        <form class="step-2-form">
          <input
            type="email"
            placeholder="E-mail"
            required
            class="step-2-form__input"
            :value="getEmail"
          />

          <input
            type="password"
            placeholder="Password"
            minlength="6"
            maxlength="60"
            required
            class="step-2-form__input"
          />

          <input type="submit" value="Continue" class="step-2-form__btn" />
        </form>
      </div>
    </section>
  </div>
</template>

<script>
import NavSignUp from '../../components/ui/NavSignUp';
import { mapGetters } from 'vuex';

export default {
  components: {
    NavSignUp,
  },

  computed: {
    ...mapGetters(['getEmail']),
  },
};
</script>

<style lang="scss" scoped>
@import '../../sass/views/signup/_step2.scss';
</style>
