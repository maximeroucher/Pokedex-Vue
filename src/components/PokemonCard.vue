<template>
    <div class="card">
        <RouterLink :to="`${pokemon.id}/details`" style="text-decoration: none; color: black;">
            <p>{{ pokemon.name }}</p>
            <img :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`"
                alt="" />
            <p>Id: {{ pokemon.id }}</p>
            <p>Weight: {{ poundsToKilograms(pokemon.weight) }} kg</p>
            <p>Height: {{ decimeterToMeter(pokemon.height) }} cm</p>
        </RouterLink>
    </div>
</template>
  
  
<script lang="ts">
import { useRoute } from 'vue-router';


interface Props {
    id: number
    name: string
    weight: number
    height: number
}


export default {

    setup() {
        const route = useRoute();
        const pokemonId = route.params.id;
        return { pokemonId };
    },

    data() {
        return {
            pokemon: {} as Props,
        };
    },
    methods: {
        fetchData() {
            fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`, {
                method: "GET",
            })
                .then((response) => {
                    response.json().then((data) => {
                        this.pokemon = {
                            id: data.id,
                            name: this.capitalizeFirstLetter(data.name),
                            weight: data.weight,
                            height: data.height,
                        };
                    });
                })
                .catch((err) => {
                    console.error(err);
                });
        },
        capitalizeFirstLetter(name: string) {
            return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
        },
        decimeterToMeter(decimeter: number) {
            return (decimeter * 10).toFixed(0);
        },
        poundsToKilograms(pounds: number) {
            return (pounds / 2.2046).toFixed(0);
        }
    },
    mounted() {
        this.fetchData()
    }
};
</script>
<style scoped>
.card {
    border-color: black;
    border-style: double;
    border-width: 5px;
    width: 325px;
    text-align: center;
    padding-top: 15px;
    padding-bottom: 15px;
    margin: 10px;
    cursor: pointer;
}
</style>