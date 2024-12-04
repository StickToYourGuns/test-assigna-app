<template>
  <div class="user-info">
    <div class="user-info__container">
      <p class="user-info--profile-name">{{name}}</p>
      <button class="user-info--button-exit" @click="logOut">Exit</button>
    </div>
    <div class="user-info__avatar">
      <img
        class="user-info__avatar--image"
        src="@/assets/person-bounding-box.svg"
        alt=""
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useDataStore } from '@/store/index';

const dataStore = useDataStore();

const logOut = () => {
  dataStore.logOut();
}

const name = computed(() => {
  return localStorage.getItem('userName');
});
</script>

<style lang="scss" scoped>
.user-info {
  display: flex;
  align-items: center;
  gap: 20px;
  height: 100%;

  &__container {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-end;
    height: 100%;
  }

  &__avatar {
    @include flex-center;
    height: 100%;

    &--image {
      height: 100%;
    }
  }

  &--profile-name {
    font-weight: 600;
  }

  &--button-exit {
    background: none;
    border: none;
    cursor: pointer;
    transition: $transition-fast;
    &:hover {
      color: $other-color2;
    }
  }
}
</style>