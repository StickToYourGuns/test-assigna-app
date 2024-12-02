<template>
  <div class="filters">
    <my-input
      style="width: 100px"
      type="text"
      placeholder="search..."
      v-model="searchQuery"
    ></my-input>
    <my-button color @click="openModal('createProduct', null)"
      >Create</my-button
    >
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useDataStore } from "@/store/index";
import { eventBus } from "@/eventBus";
import MyInput from "@/components/UI/MyInput.vue";
import MyButton from "@/components/UI/MyButton.vue";

const searchQuery = ref('');
const dataStore = useDataStore();

let timeout = null;

watch(searchQuery, (newQuery) => {
  // Очистить предыдущий таймер, если запрос обновился быстрее
  if (timeout) {
    clearTimeout(timeout);
  }

  // Установить новый таймер с задержкой 500ms
  timeout = setTimeout(async () => {
    await dataStore.updatesearchQuery(newQuery); // Запрос на сервер с новым запросом
  }, 500);
});

const openModal = (type) => {
  eventBus.emit("openModal", {type});
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
}
</style>