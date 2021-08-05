<template>
  <Loading :loading="loading" />
  <div class="container">
    <form class="user-form" @submit.prevent="submitForm">
      <div class="form-header">
        <h2>Edit Profile</h2>
      </div>
      <div class="spacer">
        <div class="photo-container">
          <input accept="image/*" type="file" @change="loadImage" />
          <img id="user-photo" src="/upload-icon-image.png" alt="user photo" />
        </div>
        <FormInput v-model="email" label="Email address" name="email" type="text" disabled />
        <FormInput v-model="fname" label="First Name" name="fname" type="text" />
        <FormInput v-model="lname" label="Last Name" name="lname" type="text" />
        <FormButton>Update Profile</FormButton>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import FormInput from '../../components/FormInput.vue';
import FormButton from '../../components/FormButton.vue';
import Loading from '../../components/Loading.vue';
import axios from '../../axios';
import AWS from 'aws-sdk';

export default defineComponent({
  components: {
    FormInput,
    FormButton,
    Loading,
  },
  setup() {
    const loading = ref(false);
    const email = ref('');
    const fname = ref('');
    const lname = ref('');
    const image_link = ref('');
    const file = ref<File>();

    // initialize the Region and Amazon Cognito credentials provider
    AWS.config.update({
      region: 'ap-southeast-1',
      credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'ap-southeast-1:9717d2f7-e484-41cf-820c-a2f48fa6a8f5',
      }),
    });

    onMounted(() => {
      email.value = localStorage.getItem('email') || '';
      fname.value = localStorage.getItem('fName') || '';
      lname.value = localStorage.getItem('lName') || '';
      image_link.value = localStorage.getItem('imageLink') || '';

      // dispatch input event to update the v-model binding
      (document.getElementById('email') as HTMLInputElement).value = email.value;
      document.getElementById('email')?.dispatchEvent(new Event('input'));
      (document.getElementById('fname') as HTMLInputElement).value = fname.value;
      document.getElementById('fname')?.dispatchEvent(new Event('input'));
      (document.getElementById('lname') as HTMLInputElement).value = lname.value;
      document.getElementById('lname')?.dispatchEvent(new Event('input'));

      if (image_link.value) {
        const s3 = new AWS.S3();

        s3.getObject(
          {
            Bucket: 'fyp.raaedkabir.com',
            Key: image_link.value,
          },
          (err, data) => {
            if (err) console.error('Error retrieving profile image', err.message);

            const encode64 = (data: Uint8Array) => {
              var str = data.reduce((a, b) => {
                return a + String.fromCharCode(b);
              }, '');
              return btoa(str).replace(/.{76}(?=.)/g, '$&\n');
            };

            (document.getElementById('user-photo') as HTMLInputElement).src = `data:${
              data.ContentType
            };base64,${encode64(data.Body as Uint8Array)}`;
          }
        );
      }
    });

    const loadImage = (evt: Event) => {
      const files = (evt.target as HTMLInputElement).files;

      if (files?.length) {
        file.value = files[0];
        (document.getElementById('user-photo') as HTMLInputElement).src = URL.createObjectURL(file.value);
      }
    };

    const uploadImage = async () => {
      const key = `images/${new Date().toISOString()}_${file.value!.name}`;

      try {
        const data = await new AWS.S3.ManagedUpload({
          params: {
            Bucket: 'fyp.raaedkabir.com',
            Key: key,
            Body: file.value,
            ContentType: file.value!.type,
          },
        }).promise();

        image_link.value = data.Key;
      } catch (err) {
        console.error(err.message);
      }
    };

    const submitForm = async () => {
      loading.value = true;

      if (file.value) {
        await uploadImage();
        localStorage.setItem('imageLink', image_link.value);
      }

      axios
        .patch('/user', {
          email: email.value,
          first_name: fname.value,
          last_name: lname.value,
          image_link: image_link.value,
        })
        .then(() => {
          loading.value = false;
        })
        .catch((err) => {
          console.error(err.message);
          loading.value = false;
        });
    };

    return {
      loading,
      email,
      fname,
      lname,
      loadImage,
      submitForm,
    };
  },
});
</script>

<style lang="scss" scoped>
.container {
  display: grid;
}

.user-form {
  background: #fff;
  margin: var(--spacer);

  .form-header {
    color: #fff;
    background: linear-gradient(60deg, var(--clr-primary-400) 50%, var(--clr-primary-700));
    margin: -2em 1em;
    padding: 1em;
    border-radius: 3px;
    box-shadow: 0 4px 20px 0 rgb(0 0 0 / 14%), 0 7px 10px -5px rgb(156 39 176 / 40%);
  }

  .spacer {
    padding: calc(var(--spacer) * 1.2);
    display: flex;
    flex-direction: column;
  }

  .photo-container {
    position: absolute;
    width: 100px;
    height: 100px;
    right: 0;
    transform: translate(-75%, -75%);
    background: #fff;
    border-radius: 50%;
    overflow: hidden;

    input {
      position: absolute;
      height: 100%;
      width: 100%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      cursor: pointer;
      opacity: 0;
    }

    img {
      height: 100%;
      margin: 0 auto;
    }
  }
}
</style>
