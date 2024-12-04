<template>
  <button :class="color ? 'color' : 'white'">
    <slot></slot>
  </button>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  color: {
    type: Boolean,
  },
});
</script>

<style lang="scss" scoped>
button {
  height: 40px;
  width: 100px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  transition: $transition-fast;

  &:hover {
    transform: translate(-1px, -1px);
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
  }

  &:focus {
    outline: none;
  }

  @media screen and (max-width: 700px) {
    width: 50px;
  }
}

.color {
  background-color: $other-color2;
}

.white {
  background-color: $white-color;
}
</style>