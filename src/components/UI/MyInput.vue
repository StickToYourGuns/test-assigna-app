<template>
  <!-- <input :id="id" :type="type" :placeholder="placeholder" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)"/> -->
  <div class="input-container">
    <input
      class="input-container--input"
      :id="id"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script setup>
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
});

const emit = defineEmits(["update:modelValue"]);
</script>

<style lang="scss" scoped>
.input-container {
  width: 100%;
  height: 40px;
  &--input {
    padding: 5px;
    height: 100%;
    width: 100%;
    border: none;
    background: none;
    border-bottom: 1px solid $text-color;
    height: 40px;
    font-weight: 600;
    font-size: 1rem;
    &:focus {
      outline: none;
    }
  }
}
</style>