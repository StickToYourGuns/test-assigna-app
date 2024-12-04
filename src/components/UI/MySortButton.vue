<template>
  <img :class="{ active: isActive, reversed: (isActive && direction === 1) }" @click="$emit('applySorting')"
    src="@/assets/filter-arrow.svg" alt="Sort Button" />
</template>

<script setup>
import { useDataStore } from "@/store/index";

const props = defineProps({
  isActive: {
    type: Boolean,
    required: true,
  },
  direction: {
    type: Number,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
img {
  cursor: pointer;
  transition: transform $transition-fast, filter $transition-fast;
  transition: $transition-fast;

  &.active {
    filter: brightness(0);
  }

  &.reversed {
    transform: rotate(180deg);
  }
}
</style>