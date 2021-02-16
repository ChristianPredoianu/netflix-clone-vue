export default {
  data() {
    return {
      swiperOption: {
        slidesPerView: 6,
        spaceBetween: 20,
        grabCursor: true,

        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        breakpoints: {
          1851: {
            slidesPerView: 5,
            spaceBetween: 0,
          },
          1522: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1185: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          900: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
        },
      },
    };
  },
};
