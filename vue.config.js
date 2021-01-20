module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "~@/sass/abstracts/_variables.scss";
          @import "~@/sass/abstracts/_mixins.scss";
          @import "~@/sass/abstracts/_utilities.scss";
          @import "~@/sass/base/_fonts.scss";
          @import "~@/sass/base/_reset.scss"; `,
      },
    },
  },
};
