<template>
  <div class="input-container">
    <input
      class="input-container--input"
      :id="id"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <img v-if="image" :src="imageSrc" alt="" />
  </div>
</template>

<script setup>
import { computed } from "vue";
import searchIcon from "@/assets/search.svg";
import editIcon from "@/assets/pen.svg";

const props = defineProps({
  type: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: false,
  },
  modelValue: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
});

const imageSrc = computed(() => {
  if (props.image === "search") return searchIcon;
  if (props.image === "edit") return editIcon;
});
</script>

<style lang="scss" scoped>
.input-container {
  display: flex;
  width: 100%;
  border-bottom: 1px solid $text-color;
  height: 40px;
  align-items: center;

  &--input {
    padding: 5px;
    height: 100%;
    width: 100%;
    border: none;
    background: none;
    height: 40px;
    font-weight: 600;
    font-size: 1rem;

    &:focus {
      outline: none;
    }
  }
}
</style>