<template>
  <div class="container">
    <h1>Welcome {{ first_name }} {{ last_name }}!</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    const first_name = localStorage.getItem('fName');
    const last_name = localStorage.getItem('lName');

    return {
      first_name,
      last_name,
    };
  },
});
</script>

<style lang="scss" scoped>
.container {
  margin-left: 2rem;
}
</style>
