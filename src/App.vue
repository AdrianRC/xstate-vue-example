<template>
  <div id="app">
    <div>
      <span :style="{ color: 'red' }">{{ state.context.error }}</span>
      <figure class="dog" @dblclick="send('FETCH')">
        <img v-if="state.context.dog" :src="state.context.dog" alt="doggo" />
      </figure>
      <div class="actions">
        <button @click="send('FETCH')">
          {{ state.matches("loading") ? "Fetching..." : "" }}
          {{ state.matches("success") ? "Fetch another dog!" : "" }}
          {{ state.matches("idle") ? "Fetch dog" : "" }}
          {{ state.matches("failure") ? "Try again" : "" }}
        </button>
        <button @click="send('CANCEL')">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import { useMachine } from "@xstate/vue";
import { Machine, assign } from "xstate";

const fetchRandomDog = function() {
  return new Promise((res, rej) => {
    setTimeout(() => {
      const fail = Math.random() < 0.1;

      if (fail) {
        rej("Failed");
      } else {
        fetch(`https://dog.ceo/api/breeds/image/random`)
          .then(data => data.json())
          .then(data => {
            console.log(data);
            res(data);
          });
      }
    }, 1000);
  });
};

const dogFetcherMachine = Machine({
  id: "dog fetcher",
  initial: "idle",
  context: {
    dog: null,
    error: null
  },
  states: {
    idle: {
      on: { FETCH: "loading" }
    },
    loading: {
      invoke: {
        src: () => fetchRandomDog(),
        onDone: {
          target: "success",
          actions: assign({ dog: (_, event) => event.data.message })
        },
        onError: {
          target: "failure",
          actions: assign({ error: (_, event) => event.data })
        }
      },
      on: { CANCEL: "idle" }
    },
    success: {
      on: { FETCH: "loading" }
    },
    failure: {
      on: { FETCH: "loading" }
    }
  }
});

export default defineComponent({
  setup() {
    const { state, send } = useMachine(dogFetcherMachine);
    return { state, send };
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
