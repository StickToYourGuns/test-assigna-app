<template>
  <transition name="slide">
    <div class="alert" v-show="error">
      <span class="alert--title">{{ error }}</span>
    </div>
  </transition>
</template>

<script setup>
import { computed } from "vue";
import { useDataStore } from "@/store/index";
const dataStore = useDataStore();
const error = computed(() => dataStore.error);
</script>

<style lang="scss" scoped>
.alert {
  position: absolute;
  top: -100%;
  height: 40px;
  display: flex;
  align-items: center;
  background: $other-color1;
  border-radius: 0 0 $radius-mini $radius-mini;
  padding: $padding-large;
  color: white;
  font-weight: 600;
  box-shadow: $main-shadow;
  z-index: 10;
  &--title {
    color: white;
    text-shadow: 1px 1px 10px rgb(0 0 0 / 50%);
  }
}

.slide-enter-active {
  animation: slide-in 3s;
}

@keyframes slide-in {
  0% {
    top: -100%;
  }
  10% {
    top: 0;
  }
  80% {
    top: 0;
  }
  100% {
    top: -100%;
  }
}
</style>