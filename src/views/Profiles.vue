<template>
  <div>
    <nav class="nav"><Logo /></nav>
  </div>
</template>

<script>
import Logo from '../components/ui/Logo';
import firebase from 'firebase';
import { mapActions } from 'vuex';
import { mapGetters } from 'vuex';

export default {
  components: {
    Logo,
  },
  methods: {
    /*   This is to set data in firebase
    setUserData() {
      firebase
        .database()
        .ref('users/' + this.currentUser.id)
        .set({
          email: this.currentUser.email,
          profiles: [],
        });
    }, */
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
    /*
    this.setUserData(); */
    this.setCurrentUser();
  },
};
</script>

<style lang="scss" scoped></style>
