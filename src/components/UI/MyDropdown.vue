<template>
  <div class="dropdown" @click="toggleDropdown" ref="dropdown">
    <div class="dropdown__title">
      <div class="dropdown__title--text">{{ display }}</div>
      <img
        class="dropdown__title--img"
        :class="{ rotated: isRotated }"
        src="@/assets/arrow-down.svg"
      />
    </div>
    <ul class="dropdown__list" v-show="dropdownVisible">
      <li
        @click="selectValue(value)"
        class="dropdown__list--item"
        v-for="value in values"
        :key="value"
      >
        {{ value }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from "vue";

const emit = defineEmits(["update"]);

const dropdownVisible = ref(false);
const isRotated = ref(false);
const dropdown = ref(null)

const props = defineProps({
  values: {
    type: Array,
    required: true,
  },
  display: {
    type: String,
    required: true,
  },
});

const toggleDropdown = () => {
  isRotated.value = !isRotated.value;
  dropdownVisible.value = !dropdownVisible.value;
};

const selectValue = (value) => {
  emit("selectDropdownValue", value);
};

const handleClickOutside = (event) => {
  if (dropdown.value && !dropdown.value.contains(event.target)) {
    dropdownVisible.value = false;
    isRotated.value = false;
  } 
};

onMounted(() => {
  document.addEventListener("mousedown", handleClickOutside);
});
onBeforeUnmount(() => {
  document.removeEventListener("mousedown", handleClickOutside);
});
</script>

<style lang="scss" scoped>
.dropdown {
  width: 80px;
  height: 40px;
  position: relative;
  &__title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    transition: 0.4s;
    &--text {
      padding: 5px;
    }
    &:hover {
      filter: brightness(0.5);
    }
    &--img {
      transition: 0.4s;
      &.rotated {
        transform: rotate(180deg);
      }
    }
  }
  &__list {
    position: absolute;
    display: flex;
    flex-direction: column-reverse;
    bottom: 100%;
    background: white;
    width: 100%;
    list-style: none;
    line-height: 1rem;
    background-color: $background-color;
    overflow: hidden;
    // box-shadow: 4px -4px 4px 0px rgb(0 0 0 / 30%);
    border-radius: $radius-mini $radius-mini 0 0;
    &--item {
      padding: 10px 5px;
      transition: 0.4s;
      cursor: pointer;
      &:hover {
        background-color: $other-color2;
        color: $white-color;
      }
    }
  }
}
</style>