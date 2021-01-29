<template>
  <div>
    <h1>dsadas</h1>
    <button @click="signout">logout</button>
    <button @click="check">check user</button>
  </div>
</template>

<script>
import firebase from 'firebase';
export default {
  methods: {
    signout() {
      firebase.auth().signOut();
      this.$router.push({ path: '/signin' });
    },
    check() {
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          console.log('ser signed in');
        } else {
          console.log('not');
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
