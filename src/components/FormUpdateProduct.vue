<template>
  <form class="product-form" autocomplete="off">
    <h2 class="product-form--header">Update product</h2>
    <div class="product-form__content">
      <my-input
        v-model="productName"
        id="productName"
        :placeholder="productObject.name"
        image="edit"
      ></my-input>
      <my-input
        v-model="productPrice"
        id="productPrice"
        type="number"
        :placeholder="productObject.price"
        image="edit"
      ></my-input>
    </div>
    <div class="product-form--buttons">
      <my-button @click.prevent="handleConfirmation()">Delete</my-button>
      <my-button
        v-show="deleteConfirmation"
        style="
          position: absolute;
          background-color: #333;
          color: white;
          z-index: 10;
        "
        @click.prevent="handleDelete(productObject.id)"
        >Are you sure?</my-button
      >
      <my-button @click.prevent="handleSubmit(productObject.id)" color
        >Update</my-button
      >
    </div>
  </form>
</template>

<script setup>
import { ref, computed } from "vue";
import { useDataStore } from "@/store/index";
import { eventBus } from "@/eventBus";
const props = defineProps({
  productObject: {
    type: Object,
  },
});

import MyInput from "@/components/UI/MyInput.vue";
import MyButton from "@/components/UI/MyButton.vue";

const dataStore = useDataStore();
const productName = ref("");
const productPrice = ref("");
const deleteConfirmation = ref(false);
const error = computed(() => dataStore.error);

const handleConfirmation = () => {
  deleteConfirmation.value = true;
  setTimeout(() => (deleteConfirmation.value = false), 3000);
};

const handleDelete = (id) => {
  dataStore.deleteProduct(id);
  closeModal();
};

const handleSubmit = async (id) => {
  if (productName.value || productPrice.value) {
    await dataStore.updateProduct(
      {
        name: productName.value || props.productObject.name,
        price: productPrice.value || props.productObject.price,
      },
      id
    );
    if (!error.value) {
      productName.value = "";
      productPrice.value = "";
      closeModal();
    }
  } else {
    dataStore.handleError("Edit something");
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

  &--buttons {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
}
</style>