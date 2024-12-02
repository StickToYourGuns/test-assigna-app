<template>
  <header class="header">
    <slot></slot>
    <user-info></user-info>
  </header>
</template>

<script setup>
import UserInfo from "@/components/UserInfo.vue";


</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: $white-color;
  border-radius: $radius-mini;
  height: 100px;
  width: 100%;
  padding: $padding-small;
  box-shadow: $mini-shadow;
}
</style>