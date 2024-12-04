<template>
  <div class="pagination">
    <my-dropdown :values="limits" :display="limit" @selectDropdownValue="selectDropdownValue"></my-dropdown>
    <div class="pagination__container">
      <div v-for="item in visiblePages" :key="item" :class="{
        'pagination__container--element': true,
        curentPage: item === currentPage,
        dots: item === '...'
      }" @click="item !== '...' && changePage(item)">
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useDataStore } from "@/store/index";
import MyDropdown from "@/components/UI/MyDropdown.vue";

const limits = ref([10, 50, 100]);

const dataStore = useDataStore();

const selectDropdownValue = (count) => {
  dataStore.updatePagination({ count });
};

const changePage = (page) => {
  dataStore.updatePagination({ page });
}


const limit = computed(() => dataStore.limit);
const totalPages = computed(() => dataStore.totalPages);
const currentPage = computed(() => dataStore.currentPage);


const visiblePages = computed(() => {
  const pages = [];
  const maxPages = totalPages.value;

  if (maxPages <= 5) {
    for (let i = 1; i <= maxPages; i++) {
      pages.push(i);
    }
  } else {
    pages.push(1);
    if (currentPage.value > 3) {
      pages.push('...');
    }
    const start = Math.max(2, currentPage.value - 1);
    const end = Math.min(maxPages - 1, currentPage.value + 1);
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    if (currentPage.value < maxPages - 2) {
      pages.push('...');
    }
    pages.push(maxPages);
  }

  return pages;
});
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 80px;
  padding: $padding-small;
  background-color: $white-color;
  border-radius: $radius-mini $radius-mini;
  box-shadow: $mini-shadow;

  &__container {
    height: 40px;
    display: flex;
    gap: 10px;
    justify-content: flex-end;
    align-items: center;

    &--element {
      border-radius: 100%;
      border: 1px solid $other-color1;
      height: 30px;
      width: 30px;
      text-align: center;
      align-content: center;
      cursor: pointer;
      transition: $transition-fast;

      &.curentPage {
        background: $other-color2;
      }

      &:hover {
        background: $other-color1;
      }
    }

    &--element.dots {
      pointer-events: none;
      cursor: default;
    }
  }
}
</style>