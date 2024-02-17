<template>
  <div class="poke-card container">
    <h1 class="title">PokéDex</h1>
    <div class="poke-card--container">
      <div
        :class="`poke-card--wrapper poke-card--${pokemon.id}`"
        v-for="pokemon in displayedPokemon"
        :key="pokemon.id"
      >
        <div class="poke-card--image">
          <img :src="pokemon.sprites.front_default" :alt="pokemon.name" />
        </div>
        <div class="poke-card--information">
          <!-- NAME -->
          <p class="poke-card--information__name">
            {{ pokemon.name }}
          </p>

          <div class="poke-card--information__types">
            <!-- ABILITIES -->
            <div class="abilities">
              <p>Abilities :</p>
              <div v-for="(ability, index) in pokemon.abilities" :key="index">
                <span>{{ ability.ability.name }}</span>
              </div>
            </div>

            <!-- WEIGHT -->
            <div class="weight">
              <p>weight :</p>
              <span class="weight">{{ pokemon.weight }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- PAGINATION -->
      <div class="poke-card--pagination">
        <button @click="previousPage" :disabled="currentPage === 1">
          Previous
        </button>
        <button
          @click="nextPage"
          :disabled="currentPage * itemsPerPage >= pokemonList.length"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed, onMounted } from "vue";
import axios from "axios";

const baseURL = "https://pokeapi.co/api/v2";

const axiosInstance = axios.create({
  baseURL,
});

export default defineComponent({
  name: "PokeCard",
  setup() {
    const pokemonList = ref([]);
    const currentPage = ref(1);
    const itemsPerPage = 5;

    const displayedPokemon = computed(() => {
      const startIndex = (currentPage.value - 1) * itemsPerPage;
      const endIndex = currentPage.value * itemsPerPage;
      return pokemonList.value.slice(startIndex, endIndex);
    });

    const nextPage = () => {
      if (currentPage.value * itemsPerPage < pokemonList.value.length) {
        currentPage.value++;
      }
    };

    const previousPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
      }
    };

    onMounted(async () => {
      try {
        const requests = Array.from({ length: 20 }, (_, index) =>
          axiosInstance.get(`/pokemon/${index + 1}`)
        );
        const responses = await Promise.all(requests);
        pokemonList.value = responses.map((response) => response.data);

        // console.log(pokemonList.value);
      } catch (error) {
        console.error("Error fetching Pokemon data:", error);
      }
    });

    return {
      pokemonList,
      displayedPokemon,
      currentPage,
      nextPage,
      previousPage,
      itemsPerPage,
    };
  },
});
</script>
