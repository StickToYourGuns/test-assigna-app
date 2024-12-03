<template>
  <div class="pagination">
    <my-dropdown
      :values="limits"
      :display="limit"
      @selectDropdownValue="selectDropdownValue"
    ></my-dropdown>
    <div class="pagination__container">
      <div
        class="pagination__container--element"
        v-for="page in totalPages"
        :key="page"
        :class="{
          'curentPage': page === currentPage
        }"
        @click="changePage(page)"
      >
        {{ page }}
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
  dataStore.updatePagination({count});
};

const changePage = (page) => {
  dataStore.updatePagination({page});
}


const limit = computed(() => dataStore.limit);
const totalPages = computed(() => dataStore.totalPages);
const currentPage = computed(() => dataStore.currentPage);
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
      transition: .3s;
      &.curentPage {
        background: $other-color2;
      }
      &:hover {
        background: $other-color1;
      }
    }
  }
}
</style>