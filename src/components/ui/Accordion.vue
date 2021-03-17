<template>
  <div>
    <vsa-list>
      <vsa-item v-for="faq in faqs" :key="faq.heading">
        <vsa-heading>
          {{ faq.heading }}
        </vsa-heading>
        <vsa-icon>
          <span class="open">
            <font-awesome-icon
              :icon="['fas', 'info-circle']"
              class="movie-container__icon movie-container__icon--play"
          /></span>
          <span class="close">
            <font-awesome-icon
              :icon="['fas', 'times-circle']"
              class="movie-container__icon movie-container__icon--play"
          /></span>
        </vsa-icon>
        <vsa-content>
          {{ faq.content }}
        </vsa-content>
      </vsa-item>
    </vsa-list>
  </div>
</template>

<script>
import {
  VsaList,
  VsaItem,
  VsaHeading,
  VsaContent,
  VsaIcon,
} from 'vue-simple-accordion';
import 'vue-simple-accordion/dist/vue-simple-accordion.css';

export default {
  // ...
  components: { VsaList, VsaItem, VsaHeading, VsaContent, VsaIcon },

  data() {
    return {
      faqs: [
        {
          heading: 'What is Netclone',
          content: `Netclone is a streaming service that offers a wide variety of award-winning TV programmes, films, anime, documentaries 
          and more – on thousands of internet-connected devices.You can watch as much as you want, whenever you want, without a single advert
           – all for one low monthly price. There's always something new to discover, and new TV programmes and films are added every week! `,
        },
        {
          heading: 'How much does Netclone cost',
          content: `Watch Netclone on your smartphone, tablet, smart TV, laptop or streaming device, all for one fixed monthly fee.
          Plans range from 9$ to 159$ a month. No extra costs, no contracts.`,
        },
        {
          heading: 'Where can I watch?',
          content: `Watch anywhere, anytime, on an unlimited number of devices. Sign in with your Netclone account to watch instantly on the
          web at netclone.dd.app from your personal computer or on any internet-connected device that offers the Netclone app,
          including smart TVs, smartphones, tablets, streaming media players and game consoles.
          You can also download your favourite programmes with the iOS, Android, or Windows 10 app. Use downloads to watch while you're on
          the go and without an internet connection. Take Netclone with you anywhere.`,
        },
        {
          heading: 'How do I cancel?',
          content: `Netclone is flexible. There are no annoying contracts and no commitments. You can easily cancel your account online in two clicks.
          There are no cancellation fees – start or stop your account at any time.`,
        },
        {
          heading: 'What can I watch on Netclone?',
          content: `Netclone has an extensive library of feature films, documentaries, anime, award-winning Netclone originals, and more.
          Watch as much as you want, any time you want.`,
        },
      ],
    };
  },
  // ...
};
</script>

<style lang="scss" scoped>
.vsa-list {
  --vsa-bg-color: #292929;
  --vsa-text-color: rgb(255, 255, 255);
  --vsa-min-width: 1000px;
  --vsa-content-padding: 3rem 5rem;
  --vsa-highlight-color: #c8c8c8;
  font-size: 1.5rem;
  text-align: start;

  cursor: pointer;

  @include respond(tab-land) {
    --vsa-min-width: 800px;
  }

  @include respond(tab-port) {
    --vsa-min-width: 600px;
  }

  @include respond(phone) {
    --vsa-min-width: 250px;
  }
}

.vsa-item {
  &--is-active {
    .vsa-item__trigger__icon {
      .open {
        display: none;
      }

      .close {
        display: block;
      }
    }
  }
  &__trigger__icon {
    .open {
      display: block;
    }

    .close {
      display: none;
    }
  }
}
</style>
