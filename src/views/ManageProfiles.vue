<template>
  <div class="profiles-body">
    <nav class="nav"><Logo class="logo" /></nav>
    <div class="container">
      <section class="section-main">
        <transition name="fade">
          <div class="profiles" v-if="isManageProfiles" key="manage">
            <h1 class="profiles__heading">Manage Profiles</h1>
            <div class="cta-container">
              <div
                class="card"
                v-for="userProfile in getUserProfiles"
                :key="userProfile.id"
                @click="getClickedProfile(userProfile)"
              >
                <font-awesome-icon :icon="userProfile.icon" class="card__img" />
                <font-awesome-icon :icon="['fas', 'edit']" class="card__edit" />
                <p class="card__name">{{ userProfile.name }}</p>
              </div>
            </div>
            <button
              class="profiles__btn"
              @click="$router.push({ name: 'Profiles' })"
            >
              Done
            </button>
          </div>

          <div class="profiles" v-if="isEditProfile" key="edit">
            <h1 class="profiles__heading">Edit Profile</h1>

            <div class="add-profile">
              <font-awesome-icon
                :icon="['fas', 'edit']"
                class="add-profile__edit"
                @click="(isEditImg = true), (isEditProfile = false)"
              />
              <font-awesome-icon
                :icon="[clickedProfile.icon[0], clickedProfile.icon[1]]"
                class="add-profile__icon"
              />
              <input
                type="text"
                required
                placeholder="Name"
                class="add-profile__input"
                v-model="newName"
              />
            </div>
            <div class="profile-cta">
              <button class="profile-cta__btn" @click="updateProfile">
                Save
              </button>
              <button
                class="profile-cta__btn profile-cta__btn--transparent"
                @click="(isEditProfile = false), (isManageProfiles = true)"
              >
                Cancel
              </button>
            </div>
          </div>

          <div class="profiles" v-if="isEditImg" key="edit-img">
            <h1 class="profiles__heading">Choose an avatar</h1>
            <font-awesome-icon
              :icon="[icon[0], icon[1]]"
              class="profiles__img"
              v-for="icon in icons"
              :key="icon.id"
              @click="updateIcon(icon)"
            />
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

export default {
  data() {
    return {
      isManageProfiles: true,
      isEditProfile: false,
      isEditImg: false,
      clickedProfile: {},
      newName: '',
      icons: [
        ['fas', 'smile'],
        ['fas', 'flushed'],
        ['fas', 'grin-tongue-wink'],
        ['fas', 'grin-tears'],
      ],
    };
  },

  components: {
    Logo,
  },

  methods: {
    updateIcon(icon) {
      this.isEditImg = false;
      this.isEditProfile = true;
      this.clickedProfile.icon = icon;
    },
    getClickedProfile(selectedProfile) {
      this.isManageProfiles = false;
      this.isEditProfile = true;
      this.clickedProfile = selectedProfile;
      this.newName = selectedProfile.name;
    },
    //Update profile in database
    updateProfile() {
      this.clickedProfile.name = this.newName;
      firebase
        .database()
        .ref(`users/${this.getCurrentUser.id}`)
        .child(`profiles/${this.clickedProfile.id}`)
        .update({
          name: this.clickedProfile.name,
          icon: this.clickedProfile.icon,
        });
      this.$router.push({ name: 'Profiles' });
    },
  },

  computed: {
    ...mapGetters(['getUserProfiles', 'getCurrentUser']),
  },
};
</script>

<style lang="scss" scoped>
@import '@/sass/views/_profiles.scss';
</style>
