<template>
  <nav class="navbar-app">
    <ul class="nav-app-container">
      <li v-for="item in navItems" :key="item.id" class="nav-app-container__option">
        <router-link
          @click="setActive(item.id)"
          :to="`/${item.id}`"
          class="nav-app-container__link"
          :class="
            isActive === item.id ? `nav-app-container__link nav-app-container__link--active` : ''
          "
          ><IconRank
            v-if="item.id === ''"
            class="icon-rank"
            :class="isActive === item.id ? 'icon-rank icon-rank--active' : ''"
          ></IconRank>
          <IconMarket
            v-else
            class="icon-rank"
            :class="isActive === item.id ? 'icon-rank icon-rank--active' : ''"
          ></IconMarket>
          {{ item.label }}</router-link
        >
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import IconRank from './icons/IconRank.vue'
import IconMarket from './icons/IconMarket.vue'

const navItems = ref([
  { id: '', label: 'Leaderboard' },
  { id: 'market', label: 'Market' },
])
const isActive = ref('')

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
  margin: 10px 5px;
  padding: 10px 20px;
  gap: 15px;
  background-color: $color-white;
  box-shadow: $box-shadow-nav;
  border-radius: 20px;
  &__option {
    list-style: none;
    margin: 10px 0;
    &--active {
      background-color: $color-primary-background;
      border: 1px solid $color-primary-background;
      color: $color-white;
    }
  }
  &__link {
    text-decoration: none;
    transition: color 0.3s ease;
    background-color: $color-white;
    border: 1px solid $color-primary-background;
    color: $color-primary-background;
    padding: 12px;
    border-radius: 20px;
    font-weight: bold;
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
      background-color: $color-primary-background;
      border: 1px solid $color-primary-background;
      color: $color-white;
      svg {
        fill: $color-white;
      }
    }
    &--active {
      background-color: $color-primary-background;
      border: 1px solid $color-primary-background;
      color: $color-white;
      &:hover {
        background-color: $color-primary-background-hover;
        border-color: $color-primary-background-hover;
      }
    }
  }
}
.icon-rank {
  width: 20px;
  fill: $color-primary-background;
  margin-right: 2px;
  &--active {
    fill: $color-white;
  }
}
</style>
