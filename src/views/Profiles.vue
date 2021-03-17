<template>
  <div class="profiles-body">
    <nav class="nav"><Logo class="logo" /></nav>
    <div class="wrapper">
      <section class="section-main">
        <!--Initial state-->
        <transition name="fade">
          <div class="profiles-container" v-if="!isAddProfile" key="initial">
            <h1 class="profiles-container__heading">Who is watching?</h1>
            <div class="cta-container">
              <div
                class="card"
                v-for="user in getUserProfiles"
                :key="user.id"
                @click="goToBrowseWithSelectedProfile(user)"
              >
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

            <button
              class="profiles-container__btn"
              @click="$router.push({ name: 'ManageProfiles' })"
            >
              Manage profiles
            </button>
          </div>
          <!--Add a profile state-->
          <div
            class="add-profile-container"
            v-if="isAddProfile"
            key="add-profile"
          >
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
        </transition>
      </section>
    </div>
  </div>
</template>

<script>
import Logo from '@/components/layout/nav/Logo';
import firebase from 'firebase/app';
import 'firebase/database';
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      isAddProfile: false,
      isProfileMessage: null,
      profileName: null,
      userProfiles: [],
    };
  },
  components: {
    Logo,
  },
  methods: {
    goToBrowseWithSelectedProfile(profile) {
      this.setClickedProfile(profile);
      this.$router.push({ path: '/browse' });
    },
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
        .ref(`users/${currentUserID}/profiles`)
        .once('value', (snapshot) => {
          if (snapshot.numChildren() < 5) {
            firebase
              .database()
              .ref('users/' + currentUserID)
              .child('profiles')
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
    ...mapActions([
      'setCurrentUser',
      'setUserProfilesFromDB',
      'setClickedProfile',
    ]),
  },
  computed: {
    ...mapGetters([
      'getCurrentUser',
      'getUserProfiles',
      'getTheClickedProfile',
    ]),
  },
  created() {
    this.setCurrentUser();
    this.setUserProfilesFromDB();
  },
};
</script>

<style lang="scss" scoped>
@import '@/sass/views/_profiles.scss';
</style>
