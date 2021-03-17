import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import '@/plugins/firebase';
import firebase from 'firebase/app';
import 'firebase/auth';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(fab, fas, far);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

//For our firebase authentication to stay alive,
//we can use the build-in firebase function ‘onAuthStateChanged’.
let app;
firebase.auth().onAuthStateChanged((user) => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount('#app');
  }
});
