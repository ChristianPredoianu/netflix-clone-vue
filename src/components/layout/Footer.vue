<template>
  <div>
    <footer class="footer">
      <div class="container">
        <p class="footer__paragraph">This site is powered by:</p>
        <a href="https://www.themoviedb.org/" target="_blank"
          ><img
            src="@/assets/images/themoviedblogo.svg"
            alt="the movie database logo"
            class="footer__logo"
        /></a>
        <p class="footer__paragraph">
          This product uses the TMDb API but is not endorsed or certified by
          TMDb.
        </p>
      </div>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
@import '@/sass/components/layout/_footer';
</style>
