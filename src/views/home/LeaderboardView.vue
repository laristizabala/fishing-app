<template>
  <div class="leaderboard-main">
    <h1 class="leaderboard-main__title">🎣 Leaderboard <span>Fishing Game</span></h1>
    <div class="leaderboard-card">
      <div class="leaderboard-card-header">
        <p v-for="item in tableSchema" :key="item.prop" class="leaderboard-card-header__title">
          {{ item.label }}
        </p>
      </div>
      <div class="leaderboard-card-body" v-for="player in playersData" :key="player.username">
        <p class="leaderboard-card-body__rank">
          {{ player.rank }}
          <span v-if="player.rank === 1">🥇</span>
          <span v-if="player.rank === 2">🥈</span>
          <span v-if="player.rank === 3">🥉</span>
        </p>
        <p class="leaderboard-card-body__text">
          {{ player.username }}
        </p>
        <p class="leaderboard-card-body__rank">
          {{ player.level }}
        </p>
        <p class="leaderboard-card-body__text">
          {{ player.xp }}
        </p>
        <p class="leaderboard-card-body__text">
          {{ player.gold }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const leaderboard = ref([])
const playersData = ref([])
const loading = ref(false)
const tableSchema = ref([
  { label: 'Rank', prop: 'rank' },
  { label: 'Player', prop: 'username' },
  { label: 'Level', prop: 'level' },
  { label: 'xp', prop: 'xp' },
  { label: 'Gold', prop: 'gold' },
])

const getLeaderBoardData = async () => {
  try {
    const response = await fetch('https://api-game.bloque.app/game/leaderboard')
    if (!response.ok) throw new Error(`Error ${response.status}`)
    leaderboard.value = await response.json()
    playersData.value = leaderboard.value.players
  } catch (error) {
    error.value = error.message
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
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: 1fr;
  grid-column-gap: 10px;
  grid-row-gap: 0px;
  border: 2px solid $color-secondary-background;
  padding: 10px 0 10px 10px;
  border-radius: 20px;
  margin: 10px 0 15px;
  &__title {
    font-size: 14px;
    font-weight: bold;
    color: $color-secondary-background;
  }
}
.leaderboard-card-body {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: 1fr;
  grid-column-gap: 10px;
  grid-row-gap: 0px;
  border-bottom: 1px solid $color-gray-hr;
  padding: 10px 0 10px 14px;
  // border-radius: 20px;
  margin: 10px 0;
  &__text {
    display: flex;
    align-items: center;
    color: $color-text-soft;
    font-size: 12px;
  }
  &__rank {
    background-color: $color-secondary-background;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-radius: 40px;
    width: 35px;
    height: 35px;
    padding: 2px;
    margin: 2px;
    color: $color-white;
  }
}
</style>
