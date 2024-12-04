<template>
  <transition-group name="fade" mode="out-in">
    <my-loader v-if="isLoading" key="loader" />
    <my-modal key="modal" />
    <router-view key="router" />
  </transition-group>
</template>

<script setup>
import MyModal from "@/components/UI/MyModal.vue";
import MyLoader from "@/components/UI/MyLoader.vue";
import { computed } from "vue";
import { useDataStore } from "@/store/index";

const dataStore = useDataStore();

const isLoading = computed(() => dataStore.isLoading);
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity $transition-fast ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
