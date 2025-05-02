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
import { ref, watch } from 'vue'
import IconRank from './icons/IconRank.vue'
import IconMarket from './icons/IconMarket.vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const navItems = ref([
  { id: '', label: 'Leaderboard' },
  { id: 'market', label: 'Market' },
])
const isActive = ref('')

const setActive = (id) => {
  isActive.value = id
}

watch(
  () => route.name,
  () => {
    isActive.value = route?.name === 'market' ? 'market' : ''
  },
  { deep: true },
)
</script>

<style lang="scss" scoped>
.nav-app-container {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 0.625rem 0.313rem;
  padding: 0.625rem 1.25rem;
  gap: 0.938rem;
  background-color: $color-white;
  box-shadow: $box-shadow-nav;
  border-radius: 1.25rem;
  &__option {
    list-style: none;
    margin: 0.625rem 0;
    &--active {
      background-color: $color-primary-background;
      border: 0.063rem solid $color-primary-background;
      color: $color-white;
    }
  }
  &__link {
    text-decoration: none;
    transition: color 0.3s ease;
    background-color: $color-white;
    border: 0.063rem solid $color-primary-background;
    color: $color-primary-background;
    padding: 0.75rem;
    border-radius: 1.25rem;
    font-weight: bold;
    font-size: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
      background-color: $color-primary-background;
      border: 0.063rem solid $color-primary-background;
      color: $color-white;
      svg {
        fill: $color-white;
      }
    }
    &--active {
      background-color: $color-primary-background;
      border: 0.063rem solid $color-primary-background;
      color: $color-white;
      &:hover {
        background-color: $color-primary-background-hover;
        border-color: $color-primary-background-hover;
      }
    }
  }
}
.icon-rank {
  width: 1.25rem;
  fill: $color-primary-background;
  margin-right: 0.125rem;
  &--active {
    fill: $color-white;
  }
}
</style>
