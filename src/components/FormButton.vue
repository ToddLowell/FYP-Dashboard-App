<template>
  <button>
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
button {
  margin-top: var(--spacer);
  padding: 0.5em 1.5em;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  box-shadow: 0 2px 2px 0 rgb(156 39 176 / 14%), 0 3px 1px -2px rgb(156 39 176 / 20%), 0 1px 5px 0 rgb(156 39 176 / 12%);
  background: var(--clr-primary-400);
  text-transform: uppercase;
  transition: all 0.2s cubic-bezier(0.4, 0, 1, 1), background 0.2s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    box-shadow: 0 14px 26px -12px rgb(156 39 176 / 42%), 0 4px 23px 0px rgb(0 0 0 / 12%),
      0 8px 10px -5px rgb(156 39 176 / 20%);
    background: var(--clr-primary-700);
  }

  &:active {
    transform: translateY(2px);
  }
}
</style>
