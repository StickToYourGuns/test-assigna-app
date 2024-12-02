<template>
  <button :class="colorChanger">
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

const colorChanger = computed(() => {
  return props.color ? "color" : "white";
});
</script>

<style lang="scss" scoped>
button {
  height: 40px;
  width: 100px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    transform: translate(-1px, -1px);
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
  }
  &:focus {
    outline: none;
  }
}

.color {
  background-color: $other-color2;
}

.white {
  background-color: $white-color;
}
</style>