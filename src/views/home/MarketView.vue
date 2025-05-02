<template>
  <div class="market-main">
    <h1 class="market-main__title">🎣 Market <span>Fishing Game</span></h1>
    <AppLoading v-if="loading"></AppLoading>
    <div v-else class="market-card">
      <div class="market-card-header">
        <p v-for="item in tableSchema" :key="item.prop" class="market-card-header__title">
          {{ item.label }}
        </p>
      </div>
      <div class="market-card-body" v-for="item in market?.items" :key="item.id">
        <p class="market-card-body__text">
          {{ item.name }}
        </p>
        <p class="market-card-body__text">
          {{ item.type }}
        </p>
        <p class="market-card-body__text">
          {{ item.description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AppLoading from '../../components/AppLoading.vue'
import { marketDummyData } from '../../utils/dummyData'

const market = ref({})
const loading = ref(false)
const tableSchema = ref([
  { label: 'Name', prop: 'name' },
  { label: 'Type', prop: 'type' },
  { label: 'Description', prop: 'description' },
])

const getMarketData = async () => {
  try {
    loading.value = true
    const response = await fetch('https://api-game.bloque.app/game/market')
    if (!response.ok) throw new Error(`Error ${response.status}`)
    market.value = await response.json()
  } catch (error) {
    market.value = { ...marketDummyData }
    error.value = error.message
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  getMarketData()
})
</script>

<style lang="scss" scoped>
.market-main {
  margin: 2rem;
  &__title {
    color: $color-primary-background;
    span {
      color: $color-secondary-background;
    }
  }
}
.market-card-header {
  display: grid;
  grid-template-columns: repeat(2, 1fr) 2fr;
  grid-template-rows: 1fr;
  grid-column-gap: 0.625rem;
  grid-row-gap: 0rem;
  border: 0.125rem solid $color-secondary-background;
  padding: 0.625rem 0 0.625rem 0.625rem;
  border-radius: 1.25rem;
  margin: 0.625rem 0 0.938rem;
  &__title {
    font-size: 0.875rem;
    font-weight: bold;
    color: $color-secondary-background;
  }
}
.market-card-body {
  display: grid;
  grid-template-columns: repeat(2, 1fr) 2fr;
  grid-template-rows: 1fr;
  grid-column-gap: 0.625rem;
  grid-row-gap: 0rem;
  border-bottom: 0.063rem solid $color-gray-hr;
  padding: 0.625rem 0 0.625rem 0.875rem;
  margin: 0.625rem 0;
  &__text {
    display: flex;
    align-items: center;
    color: $color-text-soft;
    font-size: 0.75rem;
  }
  &__rank {
    background-color: $color-secondary-background;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 2.5rem;
    width: 2.188rem;
    height: 2.188rem;
    padding: 0.125rem;
    margin: 0.125rem;
    color: $color-white;
  }
}
</style>
