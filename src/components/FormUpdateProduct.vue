<template>
  <form class="product-form">
    <h2 class="product-form--header">Update product</h2>
    <div class="product-form__content">
      <my-input
        v-model="productName"
        id="productName"
        :placeholder="productObject.name"
      ></my-input>
      <my-input
        v-model="productPrice"
        id="productPrice"
        :placeholder="productObject.price"
      ></my-input>
    </div>
    <div class="product-form--buttons">
      <my-button @click.prevent="handleConfirmation()"
        >Delete</my-button
      >
      <my-button v-show="deleteConfirmation"
        style="position: absolute; background-color: #333; color: white; z-index: 10;"
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
import { ref } from "vue";
import { useDataStore } from "@/store/index";
const props = defineProps({
  productObject: {
    type: Object,
  },
});

import MyInput from "@/components/UI/MyInput.vue";
import MyButton from "@/components/UI/MyButton.vue";
import { eventBus } from "@/eventBus";

const dataStore = useDataStore();
const productName = ref("");
const productPrice = ref("");
const deleteConfirmation = ref(false)

const handleConfirmation = () => deleteConfirmation.value = !deleteConfirmation.value;;


const handleDelete = (id) => {
    dataStore.deleteProduct(id);
    closeModal();
};

const handleSubmit = (id) => {
  dataStore.updateProduct(
    {
      name: productName.value || props.productObject.name,
      price: productPrice.value || props.productObject.price,
    },
    id
  );
  console.log(props.productObject);
  productName.value = "";
  productPrice.value = "";
  closeModal();
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
  background-color: $white-color;
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
  &--header {
  }
  &--buttons {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
}
</style>