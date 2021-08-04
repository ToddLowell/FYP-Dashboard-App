<template>
  <div class="container">
    <form class="login-form" @submit.prevent="">
      <div class="form-header">
        <h1>Log In</h1>
      </div>
      <div class="spacer">
        <FormInput label="Email address" name="email" type="text" />
        <FormInput label="Passwords" name="password" type="password" />
        <FormButton>Log In</FormButton>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import FormInput from '../components/FormInput.vue';
import FormButton from '../components/FormButton.vue';

export default defineComponent({
  components: {
    FormInput,
    FormButton,
  },
  setup() {
    const focused = ref(false);

    return {
      focused,
    };
  },
});
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  min-height: 100vh;
  background-image: url('../assets/images/login-bg.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  display: grid;
  place-items: center;

  .login-form {
    position: relative;
    border-radius: 6px;
    width: 50%;
    max-width: 500px;
    background: var(--clr-light-400);
    box-shadow: 0 1px 4px 0 rgb(0 0 0 / 14%);

    .spacer {
      padding: calc(var(--spacer) * 1.2);
      display: flex;
      flex-direction: column;
    }

    .form-header {
      color: #fff;
      background: linear-gradient(60deg, var(--clr-primary-400) 50%, var(--clr-primary-700));
      margin: -2em 1em;
      padding: 1em;
      border-radius: 3px;
      box-shadow: 0 4px 20px 0 rgb(0 0 0 / 14%), 0 7px 10px -5px rgb(156 39 176 / 40%);
    }
  }
}
</style>
