<template>
  <Loading :loading="loading" />
  <div class="container">
    <form class="login-form" @submit.prevent="logIn">
      <div class="form-header">
        <h1>Log In</h1>
      </div>
      <div class="spacer">
        <FormInput v-model="email" label="Email address" name="email" type="text" />
        <FormInput v-model="password" label="Password" name="password" type="password" />
        <FormButton>Log In</FormButton>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import FormInput from '../components/FormInput.vue';
import FormButton from '../components/FormButton.vue';
import Loading from '../components/Loading.vue';
import axios from '../axios';

export default defineComponent({
  components: {
    FormInput,
    FormButton,
    Loading,
  },
  setup() {
    const router = useRouter();
    const email = ref('');
    const password = ref('');
    const loading = ref(false);

    // redirect if already logged in
    onBeforeMount(() => {
      if (localStorage.getItem('email')) router.replace('/dashboard');
    });

    const logIn = () => {
      loading.value = true;

      axios
        .post('/users/login', {
          email: email.value,
          password: password.value,
        })
        .then((data) => {
          const { email, first_name, last_name, is_admin, image_link } = data.data;

          localStorage.setItem('email', email);
          localStorage.setItem('fName', first_name || '');
          localStorage.setItem('lName', last_name || '');
          localStorage.setItem('isAdmin', is_admin);
          localStorage.setItem('imageLink', image_link || '');

          router.replace('/dashboard');
        })
        .catch((err) => alert(err.response.data))
        .finally(() => (loading.value = false));
    };

    return {
      email,
      password,
      loading,
      logIn,
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
