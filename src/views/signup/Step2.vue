<template>
  <div>
    <header>
      <NavSignUp />
    </header>

    <section class="section-step-2-main">
      <div class="section-container">
        <div class="step-2-info">
          <p class="step-2-info__paragraph">
            Step <span class="step-2-info__span">2</span> of
            <span class="step-2-info__span">2</span>
          </p>
          <h1 class="step-2-info__heading-primary">
            Finish setting up your account
          </h1>
          <h2 class="step-2-info__heading-secondary">
            Netflix is personalised for you. Create a password to watch Netflix
            on any device at any time.
          </h2>
        </div>

        <form class="step-2-form" @submit.prevent="signup">
          <input
            type="email"
            placeholder="E-mail"
            required
            class="step-2-form__input"
            v-model="email"
          />

          <input
            type="password"
            placeholder="Password"
            minlength="6"
            maxlength="60"
            required
            class="step-2-form__input"
            v-model="password"
          />

          <input type="submit" value="Continue" class="step-2-form__btn" />
        </form>
        <div class="signup-messages">
          <h1>{{ getError }}</h1>
          <h1>{{ getCreatedMessage }}</h1>
        </div>
      </div>
    </section>
    <!-- <transition name="modal">
      <div v-if="toggleModal()">
        <div class="overlay" @click.self="isOpen = false">
          <div class="modal">
            <h1 class="modal__heading">{{ getError }}</h1>
            <button @click="isOpen = false">Ok</button>
          </div>
        </div>
      </div>
    </transition> -->
  </div>
</template>

<script>
import NavSignUp from '../../components/ui/NavSignUp';
import { mapGetters } from 'vuex';
export default {
  components: {
    NavSignUp,
  },
  data() {
    return {
      email: this.$store.state.forms.email,
      password: '',
      isAccount: false,
      isOpen: false,
    };
  },
  methods: {
    signup() {
      this.$store.dispatch('signUserUp', {
        email: this.email,
        password: this.password,
      }).forms;
    },
  },
  computed: {
    ...mapGetters({
      getError: 'getError',
      getCreatedMessage: 'getCreatedMessage',
    }),
  },
};
</script>

<style lang="scss" scoped>
@import '../../sass/views/signup/_step2.scss';
/* .modal {
  width: 500px;
  margin: 0px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px 3px;
  transition: all 0.2s ease-in;
  font-family: Helvetica, Arial, sans-serif;
}

.fadeIn-enter {
  opacity: 0;
}

.fadeIn-leave-active {
  opacity: 0;
  transition: all 0.2s step-end;
}

.fadeIn-enter .modal,
.fadeIn-leave-active.modal {
  transform: scale(1.1);
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #00000094;
  z-index: 999;
  transition: opacity 0.2s ease;
} */
</style>
