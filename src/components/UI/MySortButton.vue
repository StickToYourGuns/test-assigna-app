<template>
  <img
    :class="{ active: isActive, reversed: isActive && (dataStore.sortDirections[props.name] === -1) }"
    @click="$emit('applySorting'), console.log(dataStore.sortDirections[props.name])"
    src="@/assets/filter-arrow.svg"
    alt="Sort Button"
  />
</template>

<script setup>
import { computed } from "vue";
import { useDataStore } from "@/store/index";
const dataStore = useDataStore();

const props = defineProps({
    isActive: {
        type: Boolean,
        required: true,
    },
    direction: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
});

const sortDirection = computed(() => dataStore.sortDirections[props.name]);
</script>

<style scoped>
img {
  cursor: pointer;
  transition: transform 0.3s, filter 0.3s;
}

img.active {
  filter: brightness(0.5);
}

img.reversed {
  transform: rotate(180deg);
}
</style>