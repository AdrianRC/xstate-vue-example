<template>
  <div id="app">
    <div>
      <figure className="dog">
        <img v-if="dog" :src="dog" alt="doggo" />
      </figure>
      <button @click="fetchDog()">
        {{ isLoading ? "Fetching..." : "Fetch dog!" }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from "@vue/composition-api";

export default defineComponent({
  setup() {
    const isLoading = ref(false);
    const dog = ref(null);

    function fetchDog() {
      isLoading.value = true;
      fetch("https://dog.ceo/api/breeds/image/random")
        .then(data => data.json())
        .then(response => {
          dog.value = response.message;
          isLoading.value = false;
        });
    }

    return { isLoading, dog, fetchDog };
  }
});
</script>

<style lang="scss"></style>
