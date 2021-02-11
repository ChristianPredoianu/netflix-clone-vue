<template>
  <div class="profiles-body">
    <nav class="nav"><Logo class="logo" /></nav>
    <div class="wrapper">
      <section class="section-main">
        <transition name="fade">
          <div class="profiles-container" v-if="isManageProfiles" key="manage">
            <h1 class="profiles-container__heading">Manage Profiles</h1>
            <div class="cta-container">
              <div
                class="card"
                v-for="userProfile in getUserProfiles"
                :key="userProfile.id"
                @click="getClickedProfile(userProfile)"
              >
                <font-awesome-icon :icon="userProfile.icon" class="card__img" />
                <font-awesome-icon :icon="['far', 'edit']" class="card__edit" />
                <p class="card__name">{{ userProfile.name }}</p>
              </div>
            </div>
            <button
              class="profiles-container__btn"
              @click="$router.push({ name: 'Profiles' })"
            >
              Done
            </button>
          </div>

          <div class="profiles-container" v-if="isEditProfile" key="edit">
            <h1 class="profiles-container__heading">Edit Profile</h1>

            <div class="add-profile">
              <font-awesome-icon
                :icon="['far', 'edit']"
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

          <div class="profiles-container" v-if="isEditImg" key="edit-img">
            <h1 class="profiles-container__heading">Choose an avatar</h1>
            <font-awesome-icon
              :icon="[icon[0], icon[1]]"
              class="profiles-container__img"
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
import firebase from 'firebase';
import Logo from '../components/ui/Logo';
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';
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
      console.log(this.clickedProfile);
    },
    updateProfile() {
      this.clickedProfile.name = this.newName;
      firebase
        .database()
        .ref(`users/${this.getCurrentUser.id}/${this.clickedProfile.id}`)
        .update({
          name: this.clickedProfile.name,
          icon: this.clickedProfile.icon,
        });
      this.isEditProfile = false;
      this.isManageProfiles = true;
    },
    ...mapActions(['setCurrentUser', 'setUserProfilesFromDB']),
  },
  computed: {
    ...mapGetters(['getCurrentUser', 'getUserProfiles']),
  },
  created() {
    this.setCurrentUser();
    this.setUserProfilesFromDB();
  },
};
</script>

<style lang="scss" scoped>
@import '../sass/views/_profiles.scss';
</style>
