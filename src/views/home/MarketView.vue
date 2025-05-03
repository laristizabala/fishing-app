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
        <div class="market-card-body__item">
          <div class="market-card-body__item-icon">
            <IconFishingRod
              v-if="item.type === 'fishing_rod'"
              class="icon-general"
            ></IconFishingRod>
            <IconPoisonDelay
              v-if="item.type === 'poison_delay' || item.type === 'poison_leveling'"
              class="icon-general"
            ></IconPoisonDelay>
            <IconPoisonRecovery
              v-if="item.type === 'poison_recovery'"
              class="icon-general"
            ></IconPoisonRecovery>
            <IconFish v-if="item.type === 'poison_reveal_fishes'" class="icon-general"></IconFish>
          </div>
          <p class="market-card-body__text market-card-body__text--main">
            {{ item.name }}
          </p>
        </div>
        <p class="market-card-body__text">
          <span class="market-card-body__label">Type: </span>
          {{ item.type }}
        </p>
        <p class="market-card-body__text">
          <span class="market-card-body__label">Description: </span>
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
import IconFishingRod from '../../components/icons/IconFishingRod.vue'
import IconPoisonDelay from '../../components/icons/IconPoisonDelay.vue'
import IconPoisonRecovery from '../../components/icons/IconPoisonRecovery.vue'
import IconFish from '../../components/icons/IconFish.vue'

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
    text-align: center;
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
  &__label {
    display: none;
  }
  &__text {
    display: flex;
    align-items: center;
    justify-content: center;
    color: $color-text-soft;
    font-size: 0.75rem;

    &--main {
      font-weight: bold;
      color: $color-secondary-background;
      text-align: center;
    }
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
  &__item {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  &__item-icon {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border: 0.125rem solid $color-primary-background;
    border-radius: 2.5rem;
    padding: 0.6rem;
  }
}

.icon-general {
  width: 2rem;
  height: 2rem;
  fill: $color-primary-background;
  margin-right: 0.125rem;
}

@media (max-width: 580px) {
  .market-card-header {
    display: none;
  }

  .market-card-body {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 1fr;
    padding: 1rem;
    text-align: center;
    border: 0.063rem solid $color-gray-hr;
    border-radius: 1rem;
    &__label {
      display: block;
      font-weight: 600;
      color: $color-primary-background;
      margin-right: 0.188rem;
    }
    &__text {
      flex-direction: column;
    }
  }
}
@media (max-width: 400px) {
  .market-card-body {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    &__text {
      flex-direction: row;
    }
  }
}
</style>
