<script lang="ts">

interface PokemonInfo {
  id: number
  name: string
  height: number
  weight: number
}

export default {
    props: {
        id: Number,
    },
    data() {
        return {
            pokemon: {} as PokemonInfo,
            loading: true,
        };
    },
    methods: {
        fetchData() {
            fetch(`https://pokeapi.co/api/v2/pokemon/${this.id}`, {
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
                        this.loading = false;
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

<template>
    <div class="card" v-if="!loading">
        <h1>{{pokemon.name}}</h1>
        <div class="imageMatrix">
            <div class="imageRow">
                <img height={170}
                    :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`"
                    alt="" />
                <img height={170}
                    :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${pokemon.id}.png`"
                    alt="" />
            </div>
            <div class="imageRow">
                <img height={170}
                    :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${pokemon.id}.png`"
                    alt="" />
                <img height={170}
                    :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/${pokemon.id}.png`"
                    alt="" />
            </div>
        </div>
        <div class="info">
            <p>Id: {{pokemon.id}}</p>
            <p>Weight: {{ poundsToKilograms(pokemon.weight) }} kg</p>
            <p>Height: {{ decimeterToMeter(pokemon.height) }} cm</p>
        </div>
    </div>
    <div v-else>
        <h1>Loading...</h1>
    </div>
</template>

<style scoped>
.pokemonCard {
    margin-top: 20px;
    font-size: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}
</style>
