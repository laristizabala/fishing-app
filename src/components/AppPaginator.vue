<template>
  <nav class="pagination">
    <button @click="goToPage(1)" :disabled="currentPage === 1" class="paginator-option">
      <IconAnglesL class="icon-chevron"></IconAnglesL>
    </button>
    <button @click="prevPage" :disabled="currentPage === 1" class="paginator-option">
      <IconChevronL class="icon-chevron"></IconChevronL>
    </button>

    <button
      v-for="page in pagesToShow"
      :key="page"
      @click="goToPage(page)"
      :class="{ active: page === currentPage }"
      class="paginator-option"
    >
      {{ page }}
    </button>

    <button @click="nextPage" :disabled="currentPage === totalPages" class="paginator-option">
      <IconChevronR class="icon-chevron"></IconChevronR>
    </button>
    <button
      @click="goToPage(totalPages)"
      :disabled="currentPage === totalPages"
      class="paginator-option"
    >
      <IconAnglesR class="icon-chevron"></IconAnglesR>
    </button>
  </nav>
</template>

<script setup>
import { computed, defineEmits } from 'vue'
import IconChevronL from './icons/IconChevronL.vue'
import IconChevronR from './icons/IconChevronR.vue'
import IconAnglesL from './icons/IconAnglesL.vue'
import IconAnglesR from './icons/IconAnglesR.vue'

const props = defineProps({
  totalItems: { type: Number, required: true },
  perPage: { type: Number, default: 10 },
  modelValue: { type: Number, default: 1 },
})

const emit = defineEmits(['update:modelValue'])

const totalPages = computed(() => Math.ceil(props.totalItems / props.perPage))

const currentPage = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

const pagesToShow = computed(() => {
  const range = []
  const maxPages = 4
  let start = Math.max(currentPage.value - Math.floor(maxPages / 2), 1)
  let end = Math.min(start + maxPages - 1, totalPages.value)

  if (end - start < maxPages - 1) {
    start = Math.max(end - maxPages + 1, 1)
  }

  for (let i = start; i <= end; i++) {
    range.push(i)
  }
  return range
})

function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

function prevPage() {
  goToPage(currentPage.value - 1)
}

function nextPage() {
  goToPage(currentPage.value + 1)
}
</script>

<style scoped lang="scss">
.pagination {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  margin-top: 1rem;
}

.paginator-option {
  background: $color-text-light;
  border: 0.063rem solid $color-primary-background;
  border-radius: 1.25rem;
  padding: 0.188rem;
  width: 1.25rem;
  height: 1.25rem;
  font-size: 0.688rem;
  color: $color-primary-background;
  cursor: pointer;
  &.active {
    font-weight: bold;
    background-color: $color-primary-background;
    color: $color-text-light;
  }
  &:hover {
    font-weight: bold;
    background-color: $color-primary-background;
    color: $color-text-light;
    svg {
      fill: $color-text-light;
    }
  }
  &:disabled {
    cursor: default;
  }
}

.icon-chevron {
  fill: $color-primary-background;
  height: 0.75rem;
}
</style>
