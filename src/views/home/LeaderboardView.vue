<template>
  <div class="leaderboard-main">
    <h1 class="leaderboard-main__title">🎣 Leaderboard <span>Fishing Game</span></h1>
    <AppLoading v-if="loading"></AppLoading>
    <div v-else class="leaderboard-card">
      <div class="leaderboard-card-header">
        <p v-for="item in tableSchema" :key="item.prop" class="leaderboard-card-header__title">
          {{ item.label }}
        </p>
      </div>
      <div class="leaderboard-card-body" v-for="player in paginatedItems" :key="player.username">
        <div class="leaderboard-card-body__item">
          <p
            class="leaderboard-card-body__rank"
            :class="
              isWinnerPlayer(player.rank)
                ? 'leaderboard-card-body__rank leaderboard-card-body__rank--winner'
                : ''
            "
          >
            <span v-if="player.rank === 1">🥇</span>
            <span v-if="player.rank === 2">🥈</span>
            <span v-if="player.rank === 3">🥉</span>
            <span v-if="player.rank !== 1 && player.rank !== 2 && player.rank !== 3">{{
              player.rank
            }}</span>
          </p>
          <p
            class="leaderboard-card-body__text"
            :class="
              isWinnerPlayer(player.rank)
                ? 'leaderboard-card-body__text leaderboard-card-body__text--winner'
                : ''
            "
          >
            {{ player.username }}
          </p>
        </div>
        <div class="leaderboard-card-body__item">
          <p class="leaderboard-card-body__rank">
            {{ player.level }}
          </p>
        </div>
        <p class="leaderboard-card-body__text">
          {{ player.xp }}
        </p>
        <p class="leaderboard-card-body__text">
          {{ player.gold }}
        </p>
      </div>
      <AppPaginator
        :total-items="playersData.length"
        :per-page="perPage"
        v-model="currentPage"
      ></AppPaginator>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import AppLoading from '../../components/AppLoading.vue'
import AppPaginator from '../../components/AppPaginator.vue'
import { leaderBoardDummyData } from '../../utils/dummyData'

const leaderboard = ref([])
const playersData = ref([])
const loading = ref(false)
const tableSchema = ref([
  { label: 'Rank', prop: 'rank' },
  { label: 'Level', prop: 'level' },
  { label: 'xp', prop: 'xp' },
  { label: 'Gold', prop: 'gold' },
])
const currentPage = ref(1)
const perPage = 10

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * perPage
  return playersData.value.slice(start, start + perPage)
})

const isWinnerPlayer = (rank) => {
  return rank === 1 || rank === 2 || rank === 3
}

const getLeaderBoardData = async () => {
  try {
    loading.value = true
    const response = await fetch('https://api-game.bloque.app/game/leaderboard')
    if (!response.ok) throw new Error(`Error ${response.status}`)
    leaderboard.value = await response.json()
    playersData.value = leaderboard.value.players
  } catch (error) {
    error.value = error.message
    playersData.value = leaderBoardDummyData
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  getLeaderBoardData()
})
</script>

<style lang="scss" scoped>
.leaderboard-main {
  margin: 2rem;
  &__title {
    color: $color-primary-background;
    span {
      color: $color-secondary-background;
    }
  }
}
.leaderboard-card-header {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
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
.leaderboard-card-body {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
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
    font-size: 0.9rem;
    justify-content: center;
    &--winner {
      font-weight: bold;
      color: gold;
    }
  }
  &__item {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  &__rank {
    background-color: $color-secondary-background;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-radius: 2.5rem;
    width: 2.188rem;
    height: 2.188rem;
    padding: 0.125rem;
    margin: 0.125rem;
    color: $color-white;
    &--winner {
      background-color: $color-white;
      border: 0.063rem solid gold;
      width: 2.813rem;
      height: 2.813rem;
      font-size: 1.75rem;
    }
  }
}
</style>
