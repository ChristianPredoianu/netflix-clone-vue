<template>
  <div class="profiles-body">
    <nav class="nav"><Logo class="logo" /></nav>
    <div class="wrapper">
      <section class="section-main">
        <div class="profiles-container" v-if="!isAddProfile">
          <h1 class="profiles-container__heading">Who is watching?</h1>
          <div class="cta-container">
            <!--    <div class="card">
            <font-awesome-icon :icon="['fas', 'female']" class="card__img" />
            <p class="card__name">Christian</p>
          </div>
          <div class="card">
            <font-awesome-icon :icon="['fas', 'child']" class="card__img" />
            <p class="card__name">Christian</p>
          </div>
          <div class="card">
            <font-awesome-icon :icon="['fas', 'smile']" class="card__img" />
            <p class="card__name">Christian</p>
          </div>
          <div class="card">
            <font-awesome-icon
              :icon="['fas', 'user-astronaut']"
              class="card__img"
            />
            <p class="card__name">Christian</p>
          </div> -->
            <div class="card" @click="goToAddProfile">
              <font-awesome-icon
                :icon="['far', 'plus-square']"
                class="card__icon"
              />
              <p class="card__name">Add a profile</p>
            </div>
          </div>
          <button class="profiles-container__btn">Manage profiles</button>
        </div>
        <div class="add-profile-container" v-else>
          <h1 class="add-profile-container__heading">Add a profile</h1>
          <p class=" add-profile-container__paragraph">
            Add a profile for another person watching Netflix
          </p>
          <div class="add-profile">
            <font-awesome-icon
              :icon="['fas', 'female']"
              class="add-profile__icon"
            />
            <input
              type="text"
              required
              placeholder="Name"
              class="add-profile__input"
              v-model="profileName"
            />
          </div>
          <div class="profile-cta">
            <button class="profile-cta__btn " @click="addProfile">
              Continue
            </button>
            <button
              class="profile-cta__btn profile-cta__btn--transparent"
              @click="isAddProfile = false"
            >
              Back
            </button>
            <h1 v-if="isAddProfile">{{ isProfileMessage }}</h1>
          </div>
        </div>
      </section>
    </div>
    <button @click="signout">dsdadasdas</button>
    <h1>{{ profileData }}</h1>
  </div>
</template>

<script>
import Logo from '../components/ui/Logo';
import firebase from 'firebase';
import { mapActions } from 'vuex';
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      isAddProfile: false,
      profileName: null,
      profileData: [],
      isProfileMessage: null,
    };
  },

  components: {
    Logo,
  },
  methods: {
    goToAddProfile() {
      this.isAddProfile = true;
    },

    addProfile() {
      const currentUser = this.getCurrentUser;

      const profiles = {
        name: this.profileName,
        icon: '',
      };

      /*     var reff = firebase.database().ref('users/' + currentUser.id);
      reff.once('value').then(function(snapshot) {
        let a = snapshot.numChildren(); // 1 ("name")
        if (a < 5) {
          console.log('continue');
        } else {
          console.log('too many');
        }
      }); */

      const ref = firebase.database().ref('users/' + currentUser.id);
      /* const query = ref.orderByChild('name').equalTo(this.profileName); */

      ref.once('value', (snapshot) => {
        if (snapshot.numChildren() < 5) {
          firebase
            .database()
            .ref('users/' + currentUser.id)
            .push(profiles);
          this.isAddProfile = false;
          this.profileName = null;
          this.isProfileMessage = null;
        } else {
          this.isAddProfile = true;
          this.isProfileMessage = 'You can only have a maximum of 5 profiles';
        }
      });
    },

    //You need to fix getProfiles in the ui
    getProfiles() {
      const uid = this.getCurrentUser.id;
      firebase
        .database()
        .ref('users/' + uid)
        .on('value', (snapshot) => {
          snapshot.forEach((childSnapshot) => {
            const childData = childSnapshot.val();
          });
        });
    },

    signout() {
      firebase.auth().signOut();
      this.$router.push({ path: '/signin' });
    },

    ...mapActions(['setCurrentUser']),
  },
  computed: {
    ...mapGetters(['getCurrentUser']),
  },
  created() {
    this.setCurrentUser();
    this.getProfiles();
  },
};
</script>

<style lang="scss" scoped>
@import '../sass/views/_profiles.scss';
</style>
