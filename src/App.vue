<template>
  <transition name="fade" mode="out-in">
    <my-loader v-if="isLoading" />
  </transition>
  <transition name="fade" mode="out-in">
    <my-modal />
  </transition>
  <transition name="fade" mode="out-in">
    <router-view></router-view>
  </transition>
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
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
