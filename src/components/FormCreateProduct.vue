<template>
  <form @click.prevent class="product-form" autocomplete="off">
    <h2 class="product-form--header">Create product</h2>
    <div class="product-form__content">
      <my-input
        v-model="productName"
        id="productName"
        placeholder="Product name"
      ></my-input>
      <my-input
        v-model="productPrice"
        id="productPrice"
        placeholder="Price"
        type="number"
      ></my-input>
    </div>
    <div class="product-form--buttons">
      <my-button @click.prevent="handleSubmit" color>Create</my-button>
    </div>
  </form>
</template>

<script setup>
import { ref, computed } from "vue";
import { useDataStore } from "@/store/index";
import { eventBus } from "@/eventBus";

import MyInput from "@/components/UI/MyInput.vue";
import MyButton from "@/components/UI/MyButton.vue";

const dataStore = useDataStore();
const productName = ref("");
const productPrice = ref("");
const error = computed(() => dataStore.error);

const handleSubmit = async () => {
  if (productName.value && productPrice.value) {
    await dataStore.createProduct({
      name: productName.value,
      price: productPrice.value,
    });
    if (!error.value) {
      productName.value = "";
      productPrice.value = "";
      closeModal();
    }
  } else {
    dataStore.handleError("Fill in both fields");
  }
};

const closeModal = () => {
  eventBus.emit("closeModal");
};
</script>

<style lang="scss" scoped>
.product-form {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-radius: $radius-mini;
  padding: $padding-small;
  gap: 10px;
  position: relative;
  &__content {
    display: flex;
    flex-direction: column;
    gap: 30px;
    width: 100%;
  }
}
</style>