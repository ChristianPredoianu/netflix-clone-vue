<template>
  <div>
    <header>
      <nav class="nav-signup">
        <Logo />
        <p class="nav-signup__sign-in">Sign In</p>
      </nav>
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
        <button class="step-1-info__btn">Continue</button>
      </div>
    </section>
  </div>
</template>

<script>
import Logo from '../../components/ui/Logo';
import '../../sass/views/signup/_step1.scss';
export default {
  components: {
    Logo,
  },
};
</script>
