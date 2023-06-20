import { createRouter, createWebHistory } from 'vue-router'
import PokemonsVue from './views/Pokemons.vue'
import PokemonDetails from './views/PokemonDetails.vue'


export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: PokemonsVue,
    },
    {
      path: '/:id/details',
      component: PokemonDetails,
    },
  ],
})
