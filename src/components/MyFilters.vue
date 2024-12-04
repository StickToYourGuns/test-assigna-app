<template>
  <div class="filters">
    <my-input style="width: 100px" type="text" placeholder="search..." v-model="searchQuery" image='search'></my-input>
    <my-button color @click="openModal('createProduct', null)">Create</my-button>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useDataStore } from "@/store/index";
import { eventBus } from "@/eventBus";
import MyInput from "@/components/UI/MyInput.vue";
import MyButton from "@/components/UI/MyButton.vue";

const searchQuery = ref("");
const dataStore = useDataStore();

let timeout = null;

watch(searchQuery, (newQuery) => {
  if (timeout) {
    clearTimeout(timeout);
  }
  timeout = setTimeout(async () => {
    await dataStore.setFilteredData(newQuery);
  }, 500);
});

const openModal = (type) => {
  eventBus.emit("openModal", { type });
};
</script>

<style lang="scss" scoped>
.filters {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 80px;
  padding: $padding-small;
  background-color: $white-color;
  border-radius: $radius-mini;
  box-shadow: $mini-shadow;

  @media screen and (max-width: 700px) {
    padding: $padding-mini;
  }
}
</style>