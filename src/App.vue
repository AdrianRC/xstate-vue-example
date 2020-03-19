<template>
  <div id="app">
    <div>
      <span :style="{ color: 'red' }">{{ error }}</span>
      <figure class="dog" @dblclick="fetchDog">
        <img v-if="dog" :src="dog" alt="doggo" />
      </figure>
      <div class="actions">
        <button @click="fetchDog()" :disabled="isLoading">
          {{ isLoading ? "Fetching..." : "Fetch dog!" }}
        </button>
        <button @click="cancel">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from "@vue/composition-api";

export default defineComponent({
  setup() {
    const isLoading = ref(false);
    const error = ref(null);
    const canceled = ref(false);
    const dog = ref(null);

    function fetchDog() {
      if (isLoading.value) return;
      canceled.value = false;
      error.value = null;
      isLoading.value = true;
      fetch("https://dog.ceo/api/breeds/image/random")
        .then(data => data.json())
        .then(response => {
          if (canceled.value) return;
          isLoading.value = false;
          dog.value = response.message;
        })
        .catch(error => {
          isLoading.value = false;
          canceled.value = false;
          error.value = error;
        });
    }

    function cancel() {
      isLoading.value = false;
      canceled.value = true;
    }

    return { isLoading, dog, fetchDog, error, cancel };
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

.actions {
  display: flex;
  justify-content: space-around;
}
</style>
