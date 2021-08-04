<template>
  <div class="container">
    <div v-if="imageMissing" class="alert alert__error spacer">
      <mdicon name="alert-circle" />
      <p class="alert__text">Missing Photo</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    const imageMissing = !localStorage.getItem('imageLink');

    return {
      imageMissing,
    };
  },
});
</script>

<style lang="scss" scoped>
.container {
  margin: 0 2rem;
}

//variables
$alertPrimary: #ccf2ff;
$alertSecondary: #e2e3e3;
$alertWarning: #ffff99;
$alertError: #ffb3b3;
$alertSuccess: #d6f5d6;

.alert {
  width: 100%;
  border-radius: 3px;
  padding: 1rem 2rem;
  color: black;

  .mdi {
    margin-right: 1rem;
  }

  &__text {
    display: inline-block;
    font-size: 1.4rem;
  }

  &__error {
    background-color: $alertError;
  }
}
</style>
