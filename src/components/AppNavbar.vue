<template>
  <header>
    <nav>
      <ul class="nav-app-container">
        <li v-for="item in navItems" :key="item.id">
          <button @click="setActive(item.id)" class="nav-app-container__option">
            {{ item.label }}
          </button>
        </li>
      </ul>
      <!-- <button
        @click="setActive('leaderboard')"
        :class="[
          'px-4 py-2 rounded-md focus:outline-none',
          isActive === item.id
            ? 'bg-primary text-white'
            : 'text-gray-700 hover:bg-gray-200 hover:text-gray-900',
        ]"
      >
        <RouterLink to="/">Leaderboard</RouterLink>
      </button>
      <button>
        <RouterLink to="/market">Market</RouterLink>
      </button> -->
    </nav>
  </header>
</template>

<script setup>
import { ref } from 'vue'

const navItems = ref([
  { id: 'market', label: 'Market' },
  { id: 'leaderboard', label: 'Leaderboard' },
])
const isActive = ref('market')

const setActive = (id) => {
  isActive.value = id
}
</script>

<style lang="scss" scoped>
.nav-app-container {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.nav-app-container__option {
  background-color: --color-background;
}
</style>
