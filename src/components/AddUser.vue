<template>
  <Loading :loading="loading" />
  <div class="backdrop" @click="$emit('toggle', false)"></div>
  <div class="form-container">
    <form @submit.prevent="submit">
      <div class="spacer">
        <FormInput v-model="email" label="Email Address" name="email" type="email" required />
        <FormInput v-model="password" label="Temporary Password" name="password" type="password" required />
        <FormInput v-model="firstName" label="First Name (Optional)" name="fname" type="text" />
        <FormInput v-model="lastName" label="Last Name (Optional)" name="lname" type="text" />
        <div class="checkbox">
          <span>Administrator?</span>
          <input id="admin" v-model="isAdmin" type="checkbox" name="admin" />
        </div>
        <FormButton>Submit</FormButton>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
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
  emits: ['toggle', 'reload'],
  setup(props, ctx) {
    const loading = ref(false);
    const email = ref('');
    const password = ref('');
    const firstName = ref('');
    const lastName = ref('');
    const isAdmin = ref(false);

    const submit = () => {
      loading.value = true;

      axios
        .post('/users/new', {
          email: email.value,
          password: password.value,
          is_admin: isAdmin.value,
          first_name: firstName.value,
          last_name: lastName.value,
        })
        .then(() => {
          ctx.emit('toggle', false);
          ctx.emit('reload');
        })
        .catch((err) => alert('Error Adding User: ' + err.response.data))
        .finally(() => (loading.value = false));
    };

    return {
      loading,
      email,
      password,
      firstName,
      lastName,
      isAdmin,
      submit,
    };
  },
});
</script>

<style lang="scss" scoped>
.backdrop {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 90;
}

.form-container {
  position: fixed;
  padding-top: 0;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  max-width: 500px;
  background: #fff;
  border-radius: 6px;
  z-index: 91;

  .spacer {
    padding: 0 calc(var(--spacer) * 1.2) var(--spacer);
    display: flex;
    flex-direction: column;
  }

  .checkbox {
    margin-top: var(--spacer);

    span {
      color: var(--clr-neutral-400);
      font-size: 14px;
      font-weight: 400;
      line-height: 1.42857;
      margin-right: 1em;
    }

    input {
      vertical-align: middle;
    }
  }
}
</style>
