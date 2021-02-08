<template>
  <div class="profiles-body">
    <nav class="nav"><Logo class="logo" /></nav>
    <div class="wrapper">
      <section class="section-main">
        <div class="profiles-container" v-if="!isAddProfile">
          <h1 class="profiles-container__heading">Who is watching?</h1>
          <div class="cta-container">
            <div class="card" v-for="user in getUserProfiles" :key="user.id">
              <font-awesome-icon :icon="user.icon" class="card__img" />
              <p class="card__name">{{ user.name }}</p>
            </div>

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
              :icon="['fas', 'smile']"
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
              @click="(isAddProfile = false), (isProfileMessage = null)"
            >
              Back
            </button>
            <h1 v-if="isAddProfile">{{ isProfileMessage }}</h1>
          </div>
        </div>
      </section>
    </div>
    <button @click="signout">Signout</button>
    <h1 v-for="user in userProfiles" :key="user.id">{{ user }}</h1>
    <h1>{{ getUserProfiles }}</h1>
  </div>
</template>

<script>
import Logo from '../components/ui/Logo';
import firebase from 'firebase';
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      isAddProfile: false,
      profileName: null,
      userProfiles: [],
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
      const currentUserID = this.getCurrentUser.id;
      const profiles = {
        name: this.profileName,
        icon: ['fas', 'smile'],
      };

      firebase
        .database()
        .ref('users/' + currentUserID)
        .once('value', (snapshot) => {
          if (snapshot.numChildren() < 5) {
            firebase
              .database()
              .ref('users/' + currentUserID)
              .push(profiles);
            this.isAddProfile = false;
            this.profileName = null;
            this.isProfileMessage = null;
          } else {
            this.isAddProfile = true;
            this.profileName = null;
            this.isProfileMessage = 'You can only have a maximum of 5 profiles';
          }
        });
    },
    signout() {
      firebase.auth().signOut();
      this.$router.push({ path: '/signin' });
    },

    ...mapActions(['setCurrentUser', 'getUserProfilesFromDB']),
  },
  computed: {
    ...mapGetters(['getCurrentUser', 'getUserProfiles']),
  },
  created() {
    this.setCurrentUser();
    this.getUserProfilesFromDB();
  },
};
</script>

<style lang="scss" scoped>
@import '../sass/views/_profiles.scss';
</style>
