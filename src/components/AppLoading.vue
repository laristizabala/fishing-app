<template>
  <div class="loading-container">
    <span class="loader">Load&nbsp;ng</span>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.loading-container {
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.loader {
  color: $color-primary-background;
  display: inline-block;
  position: relative;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 3rem;
  letter-spacing: 0.25rem;
  box-sizing: border-box;
}
.loader::before {
  content: '';
  position: absolute;
  right: 4.25rem;
  bottom: 0.625rem;
  height: 1.5rem;
  width: 0.438rem;
  outline: 0.063rem solid $color-primary-background;
  color: $color-primary-background-hover;
  box-sizing: border-box;
  animation: animloader1 1s linear infinite alternate;
}
.loader::after {
  content: '';
  width: 0.25rem;
  height: 0.25rem;
  background: $color-primary-background-hover;
  position: absolute;
  right: 4.375rem;
  top: 0.5rem;
  box-sizing: border-box;
  animation: animloader 1s ease-out infinite alternate;
}

@keyframes animloader {
  0% {
    top: 0.5rem;
    transform: rotate(0deg) scale(1);
  }
  100% {
    top: 0px;
    transform: rotate(180deg) scale(1.5);
  }
}

@keyframes animloader1 {
  0% {
    box-shadow: 0 0 inset;
  }
  100% {
    box-shadow: 0 -28px inset;
  }
}
</style>
