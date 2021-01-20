<template>
  <div>
    <vsa-list>
      <vsa-item v-for="faq in faqs" :key="faq.heading">
        <vsa-heading class="heading">
          {{ faq.heading }}
        </vsa-heading>

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
          heading: 'What is Netflix',
          content: `Netflix is a streaming service that offers a wide variety of award-winning TV programmes, films, anime, documentaries 
          and more – on thousands of internet-connected devices.You can watch as much as you want, whenever you want, without a single advert
           – all for one low monthly price. There's always something new to discover, and new TV programmes and films are added every week! `,
        },
        {
          heading: 'How much does Netflix cost',
          content: `Watch Netflix on your smartphone, tablet, smart TV, laptop or streaming device, all for one fixed monthly fee.
          Plans range from 89 kr to 159 kr a month. No extra costs, no contracts.`,
        },
        {
          heading: 'Where can I watch?',
          content: `Watch anywhere, anytime, on an unlimited number of devices. Sign in with your Netflix account to watch instantly on the
          web at netflix.com from your personal computer or on any internet-connected device that offers the Netflix app,
          including smart TVs, smartphones, tablets, streaming media players and game consoles.
          You can also download your favourite programmes with the iOS, Android, or Windows 10 app. Use downloads to watch while you're on
          the go and without an internet connection. Take Netflix with you anywhere.`,
        },
        {
          heading: 'How do I cancel?',
          content: `Netflix is flexible. There are no annoying contracts and no commitments. You can easily cancel your account online in two clicks.
          There are no cancellation fees – start or stop your account at any time.`,
        },
        {
          heading: 'What can I watch on Netflix?',
          content: `Netflix has an extensive library of feature films, documentaries, TV programmes, anime, award-winning Netflix originals, and more.
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
  text-align: start;
  font-size: 3rem;
  cursor: pointer;
}
</style>
