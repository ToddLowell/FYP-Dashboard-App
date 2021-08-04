<template>
  <div v-if="loading" class="backdrop"></div>
  <div v-if="loading" class="lds-dual-ring"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    loading: {
      required: true,
      type: Boolean,
    },
  },
});
</script>

<style scoped>
.backdrop {
  content: '';
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 100;
}

.lds-dual-ring {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: inline-block;
  width: 150px;
  height: 150px;
  z-index: 101;
}

.lds-dual-ring::after {
  content: '';
  display: block;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 8px solid var(--clr-primary-400);
  border-color: var(--clr-primary-400) transparent var(--clr-primary-400) transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}

@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
