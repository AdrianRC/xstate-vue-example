<template>
  <div id="app">
    <div>
      <figure class="dog">
        <img v-if="dog" :src="dog" alt="doggo" />
      </figure>
      <button @click="fetchDog()" :disabled="isLoading">
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

<style lang="scss">
.App {
  font-family: sans-serif;
  text-align: center;
}

.dog {
  height: 200px;
  width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
}

.dog > img {
  width: 100%;
  height: auto;
}

* {
  box-sizing: border-box;
  position: relative;
  user-select: none;
}

body {
  display: flex;
  justify-content: center;
  align-items: center;
}

button {
  appearance: none;
  background: #5c68be;
  border: none;
  color: white;
  padding: 1rem;
  font-weight: bold;
  border-radius: 1rem;
  box-shadow: 0 0.5rem 1rem rgba(92, 104, 190, 0.5);
  cursor: pointer;

  + button {
    margin-left: 1rem;
  }
}

figure {
  border-radius: 1rem;
  border: 1px solid #aaa;
  cursor: pointer;
}
</style>
