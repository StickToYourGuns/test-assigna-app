<template>
  <div class="modal" v-if="isVisible" @click="closeModal">
    <my-alert style="position: absolute; top: 0"></my-alert>
    <div @click.stop class="modal__container">
      <component :is="modalSelect" :productObject="productObject" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { eventBus } from "@/eventBus";
import FormCreateProduct from "@/components/FormCreateProduct.vue";
import FormUpdateProduct from "@/components/FormUpdateProduct.vue";
import MyAlert from "@/components/UI/MyAlert.vue";

const isVisible = ref(false);
const modalType = ref("");
const productObject = ref("");

const openModal = ({ type, product }) => {
  modalType.value = type;
  isVisible.value = true;
  productObject.value = product;
};

const closeModal = () => {
  isVisible.value = false;
};

const handleKeyPress = (event) => {
  if (event.key === "Escape") closeModal();
};

const modalSelect = computed(() => {
  return (modalType.value === "createProduct") ? FormCreateProduct : FormUpdateProduct;
});

onMounted(() => {
  eventBus.on("openModal", openModal);
  eventBus.on("closeModal", closeModal);
  window.addEventListener("keydown", handleKeyPress);
});
onBeforeUnmount(() => {
  eventBus.off("openModal", openModal);
  eventBus.off("closeModal", closeModal);
  window.removeEventListener("keydown", handleKeyPress);
});
</script>

<style lang="scss" scoped>
.modal {
  @include flex-center;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10;
  backdrop-filter: blur(10px);

  &__container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60%;
    width: 60%;
    max-width: 400px;
    padding: $padding-small;
    background-color: $background-color;
    border-radius: $radius-default;

    @media screen and (max-width: 700px) {
      width: 80%;
      height: auto;
    }
  }
}
</style>