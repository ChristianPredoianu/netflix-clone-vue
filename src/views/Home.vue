<template>
  <div class="home">
    <section class="hero">
      <nav class="nav">
        <Logo class="nav__logo" />
        <router-link tag="p" :to="{ path: 'signIn' }"
          ><p class="nav__login-btn">Sign in</p></router-link
        >
      </nav>
      <div class="hero-container">
        <h1 class="heading-primary ">
          Unlimited access to movies, series and other.
        </h1>
        <h2 class="heading-secondary u-margin-t-b-small ">
          Watch where you want. Unsubscribe when you want.
        </h2>
        <p class="hero-container__paragraph ">
          Ready to start watching? Fill in your e-mail to create an account.
        </p>
        <GetStarted />
      </div>
    </section>

    <section class="section-tv">
      <div class="tv-description">
        <h2 class="heading-primary u-text-align-start">Watch on your tv</h2>
        <p class="heading-secondary u-margin-t-small u-text-align-start">
          Watch on smart-tv:s, Playstation, Xbox, Chromecast, Apple TV,
          Blu-ray-players and many more.
        </p>
      </div>

      <div class="img-container">
        <img
          src="@/assets/images/tv2.png"
          alt="tv"
          class="img-container__img"
        />
        <div class="img-container__video-container">
          <!-- https://www.freepnglogos.com/pics/tv -->
          <video
            src="@/assets/videos/video1.mp4"
            playsinline
            autoplay
            muted
            loop
            class="img-container__video"
          ></video>
        </div>
      </div>
    </section>
    <section class="section-download">
      <div class="phone-container">
        <img
          src="@/assets/images/phone.png"
          alt="phone"
          class="phone-container__img"
        />
        <img
          src="@/assets/images/netflix-phone.jpg"
          alt="netflix phone"
          class="phone-container__inner-img"
        />
        <div class="phone-overlay">
          <img
            src="@/assets/images/stranger-things.jpg"
            alt="stranger things"
            class="phone-overlay__img"
          />
          <div class="overlay-info">
            <p class="overlay-info__heading">Stranger Things</p>
            <span class="overlay-info__text">Downloading...</span>
          </div>
        </div>
      </div>
      <div class="phone-description">
        <h2 class="heading-primary u-text-align-start">
          Download your programmes to watch offline.
        </h2>
        <p class="heading-secondary u-margin-t-small u-text-align-start">
          Save your favourites so that you always have something to watch.
        </p>
      </div>
    </section>
    <section class="watch-anywhere">
      <div class="watch-anywhere-description">
        <h2 class="heading-primary u-text-align-start">Watch anywhere.</h2>
        <p class="heading-secondary u-margin-t-small u-text-align-start">
          Stream unlimited movies and series on mobile, tablet, pc and tv
          without paying extra.
        </p>
      </div>
      <div class="img-wrapper">
        <img
          src="@/assets/images/imac.png"
          alt="tv"
          class="img-wrapper__img-imac"
        />
        <img
          src="@/assets/images/iphone-netflix.png"
          alt="tv"
          class="img-wrapper__img-iphone"
        />
        <div class="img-wrapper__video-container">
          <!-- https://www.freepnglogos.com/pics/tv -->
          <video
            src="@/assets/videos/video2.mp4"
            playsinline
            autoplay
            muted
            loop
            class="img-wrapper__video"
          ></video>
        </div>
      </div>
    </section>
    <section class="section-faq">
      <h2 class="heading-primary u-margin-bottom-medium">FAQ</h2>
      <Accordion />
      <p class="heading-secondary u-margin-t-big ">
        Stream unlimited movies and series on mobile, tablet, pc and tv without
        paying extra.
      </p>
      <GetStarted class="form-faq" />
    </section>
    <footer class="footer">
      <p class="footer__paragraph">Png:s on this site are from</p>
      <a
        href="https://www.freepnglogos.com/pics/tv"
        class="footer__attribution"
        target="_blank"
        rel="noopener"
        >Freepnglogos</a
      >
    </footer>
  </div>
</template>

<script>
import Logo from '@/components/layout/nav/Logo';
import GetStarted from '@/components/forms/GetStarted';
import Accordion from '@/components/ui/Accordion';

export default {
  components: {
    Logo,
    GetStarted,
    Accordion,
  },
};
</script>

<style lang="scss" scoped>
@import '@/sass/views/_home';
</style>
