<template>
  <div class="form-input" :class="{ focused: focused, 'has-input': input.length !== 0 }">
    <label :for="name">{{ label }}</label>
    <div class="underline">
      <input :id="name" v-bind="$attrs" v-model="input" :name="name" @focus="focused = true" @blur="focused = false" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  props: {
    label: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  setup() {
    const focused = ref(false);
    const input = ref('');

    return {
      focused,
      input,
    };
  },
});
</script>

<style lang="scss" scoped>
.form-input {
  position: relative;
  margin-top: var(--spacer);

  label {
    color: var(--clr-neutral-400);
    font-size: 14px;
    font-weight: 400;
    line-height: 1.42857;
    top: 0;
    left: 0;
    position: absolute;
    transform: translate(0, 24px) scale(1);
    transition: color 200ms cubic-bezier(0, 0, 0.2, 1) 0ms, transform 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
  }

  input {
    color: currentColor;
    width: 100%;
    height: 1.1876em;
    display: block;
    padding: 6px 0 7px;
    border: none;
    background: none;
    box-sizing: content-box;
    pointer-events: auto;

    &:focus {
      outline: none;
    }

    &:disabled {
      cursor: not-allowed;
    }
  }

  .underline {
    position: relative;
    margin-top: 19px;
    pointer-events: none;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      transition: border-bottom-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
      border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    }

    &::after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      border-bottom: 2px solid var(--clr-primary-400);
      transform: scaleX(0);
      transition: transform 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
    }
  }

  &.focused .underline::after {
    transform: scaleX(1);
  }

  &.focused label,
  &.has-input label {
    transform: translate(0, 1.5px) scale(1);
    transform-origin: top left;
  }
}
</style>
