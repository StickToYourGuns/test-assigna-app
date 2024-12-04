<template>
  <div class="app-container">
    <my-header>
      <h1>Products</h1>
    </my-header>
    <div class="products-view">
      <my-filters></my-filters>
      <products></products>
      <my-pagination></my-pagination>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useDataStore } from '@/store/index';
import MyHeader from "@/components/MyHeader.vue";
import MyFilters from "@/components/MyFilters.vue";
import Products from "@/components/Products.vue";
import MyPagination from "@/components/MyPagination.vue";

const dataStore = useDataStore();

onMounted(() => {
  dataStore.getProducts();
});
</script>

<style lang="scss" scoped>
.app-container {
  width: calc(100% - 100px);
  min-height: calc(100vh - 100px);
  background-color: $background-color;
  border-radius: $radius-default;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: $padding-large;
  gap: 30px;
  box-shadow: $main-shadow;
  margin: 50px 0;
}

.products-view {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  border-radius: $radius-mini;
  background-color: $white-color;
  box-shadow: $mini-shadow;
  flex-grow: 1;
}

@media screen and (max-width: 700px) {
  .app-container {
    width: calc(100% - 20px);
    min-height: calc(100vh - 20px);
    margin: 10px 0;
    padding: $padding-mini;
  }
}
</style>