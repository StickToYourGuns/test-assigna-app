<template>
  <div class="products">
    <div v-if="!totalItems" class="products--empty">
      There is nothing to show. Create something!
    </div>
    <ul @click="console.log(totalItems)" v-else class="products__list">
      <li class="products__list--item">
        <div class="product-card title">
          Name
          <my-sort-button
            :is-active="activeSort === 'name'"
            :direction="sortDirections.name"
            name="name"
            @apply-sorting="applySorting('name')"
          >
          </my-sort-button>
        </div>
        <div class="product-card title">
          Price
          <my-sort-button
            :is-active="activeSort === 'price'"
            :direction="sortDirections.price"
            name="price"
            @apply-sorting="applySorting('price')"
          >
          </my-sort-button>
        </div>
        <div class="product-card title">
          Date added
          <my-sort-button
            :is-active="activeSort === 'date'"
            :direction="sortDirections.date"
            name="date"
            @apply-sorting="applySorting('date')"
          >
          </my-sort-button>
        </div>
        <div class="product-card title"></div>
      </li>
      <transition-group name="list">
        <li
          class="products__list--item"
          v-for="product in products"
          :key="product.id"
        >
          <div class="product-card">{{ product.name }}</div>
          <div class="product-card">{{ product.price }}</div>
          <div class="product-card">{{ formatDate(product.created_at) }}</div>
          <my-button
            class="product-card button"
            color
            @click="openModal('updateProduct', product)"
            >Edit</my-button
          >
        </li>
      </transition-group>
    </ul>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useDataStore } from "@/store/index";
import { eventBus } from "@/eventBus";
import MyButton from "@/components/UI/MyButton.vue";
import MySortButton from "@/components/UI/MySortButton.vue";

const dataStore = useDataStore();

const openModal = (type, product) => {
  eventBus.emit("openModal", { type, product });
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};

const applySorting = (type) => {
  dataStore.setSortedData(type);
};

const products = computed(() => dataStore.filteredData);
const sortDirections = computed(() => dataStore.sortDirections);
const activeSort = computed(() => dataStore.activeSort);
const totalItems = computed(() => dataStore.totalItems);
</script>

<style lang="scss" scoped>
.products {
  @include flex-center;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  padding: $padding-small;
  flex-grow: 1;
  background-color: $background-color;

  @media screen and (max-width: 700px) {
    padding: $padding-mini;
  }

  &--empty {
    align-self: center;
    background-color: $white-color;
    padding: $padding-mini;
    border-radius: $radius-mini;
  }

  &__list {
    width: 100%;
    height: 100%;
    list-style: none;
    gap: 3px;
    display: grid;

    &--item {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr 100px;
      box-shadow: $mini-shadow;
      height: 40px;
      align-content: center;
      padding-left: 5px;
      border-radius: 5px;
      gap: 10px;
      background-color: $white-color;

      @media screen and (max-width: 700px) {
        grid-template-columns: 2.5fr 1fr 1fr 50px;
      }
      @media screen and (max-width: 500px) {
        grid-template-columns: 1.5fr 0.7fr 1.3fr 50px;
      }
    }
  }
}

.product-card {
  align-self: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &.title {
    display: flex;
  }
}

.list-move {
  transition: transform $transition-fast ease;
}
</style>