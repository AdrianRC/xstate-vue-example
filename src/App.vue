<template>
  <div id="app">
    <dog-fetcher />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import DogFetcher from "@/components/DogFetcher.vue";

export default defineComponent({
  components: {
    DogFetcher
  }
});
</script>

<style lang="scss">
.App {
  font-family: sans-serif;
  text-align: center;
}
</style>
