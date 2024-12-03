<template>
  <div>
    {{ error }}
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useDataStore } from "@/store/index";
const dataStore = useDataStore();
const error = computed(() => dataStore.error);
</script>

<style lang="scss">

</style>