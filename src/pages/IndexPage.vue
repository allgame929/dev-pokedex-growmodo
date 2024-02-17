<template>
  <q-page class="flex flex-center">
    <PokeCard />
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import PokeCard from "components/PokeCard.vue";

export default defineComponent({
  name: "IndexPage",

  components: {
    PokeCard,
  },
});
</script>
