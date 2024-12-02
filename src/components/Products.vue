<template>
  <div class="products">
    <ul class="products__list">
      <li class="products__list--item"><div>Name</div><div>Price</div><div>Date added</div></li>
      <li class="products__list--item" v-for="product in products" :key="product.id">
        <div class="product-card name">{{ product.name }}</div>
        <div class="product-card price">{{ product.price }}</div>
        <div class="product-card created">{{ formatDate(product.created_at) }}</div>
        <my-button class="product-card button" color @click="openModal('updateProduct', product)">Edit</my-button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useDataStore } from "@/store/index";
import { eventBus } from "@/eventBus";
import MyButton from "@/components/UI/MyButton.vue";

const dataStore = useDataStore();

const openModal = (type, product) => {
  eventBus.emit("openModal", {type, product});
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};

const products = computed(() => dataStore.data);
</script>

<style lang="scss" scoped>
.products {
  @include flex-center;
  width: 100%;
  height: 100%;
  padding: $padding-small;

  &__list {
    width: 100%;
    height: 100%;
    list-style: none;
    gap: 5px;

    display: grid;


    &--item {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      box-shadow: $mini-shadow;
      height: 40px;
      align-content: center;
      padding-left: 5px;
      border-radius: 5px;
    }
  }
}

.product-card {
  align-self: center;

  &.button{
    justify-self: end;
  }
}
</style>