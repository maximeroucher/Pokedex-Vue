<script setup lang="ts">
import Pokemons from './components/Pokemons.vue'

</script>

<template>
  <div class="intro">
    <h1>Pokemon</h1>
    <Pokemons />
  </div>
</template>

<style scoped>
.intro {
  font-size: 30px;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 30px;
}
</style>
